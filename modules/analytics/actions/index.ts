"use server";

import { db } from "@/lib/db";
import { headers } from "next/headers";
import { normalizeIP } from "../utils";

export const logProfileVist = async (userId: string, visitorIp?: string) => {
  const headerList = await headers();

  const ip =
    visitorIp ||
    headerList.get("x-real-ip") ||
    headerList.get("x-forwarded-for") ||
    headerList.get("cf-connecting-ip") ||
    "unknown";

  const recentVisit = await db.profileAnalytics.findFirst({
    where: {
      userId,
      visitorIp: ip,
      visitedAt: {
        gte: new Date(Date.now() - 60 * 60 * 1000), // Last hour
      },
    },
  });

  if (!recentVisit) {
    const profileVisit = await db.profileAnalytics.create({
      // @ts-ignore
      data: {
        visitorIp: ip,
        userId,
      },
    });
    return profileVisit;
  }

  return null;
};

export const getProfileVistCount = async (userId: string) => {
  try {
    const totalVisits = await db.profileAnalytics.count({ where: { userId } });

    const visitsLast1Hour = await db.profileAnalytics.count({
      where: {
        userId,
        visitedAt: { gte: new Date(Date.now() - 60 * 60 * 1000) },
      },
    });

    const visitsLast24Hours = await db.profileAnalytics.count({
      where: {
        userId,
        visitedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });

    const visitsLast7Days = await db.profileAnalytics.count({
      where: {
        userId,
        visitedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      },
    });

    const visitsLast30Days = await db.profileAnalytics.count({
      where: {
        userId,
        visitedAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    });

    const uniqueVisitors = await db.profileAnalytics.groupBy({
      by: ["visitorIp"],
      where: { userId },
      _count: { id: true },
    });

    return {
      totalVisits,
      visitsLast1Hour,
      visitsLast24Hours,
      visitsLast7Days,
      visitsLast30Days,
      uniqueVisitors: uniqueVisitors.length,
    };
  } catch (error) {
    console.error("Error fetching profile visit count:", error);
    return null;
  }
};

// Get daily visits for the last `days` days
export const getDailyProfileVisits = async (
  userId: string,
  days: number = 30
) => {
  try {
    type Visit = { visitedAt: Date };
    const visits: Visit[] = await db.profileAnalytics.findMany({
      where: {
        userId,
        visitedAt: { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
      },
      select: { visitedAt: true },
      orderBy: { visitedAt: "desc" },
    });

    const dailyVisits: Record<string, number> = visits.reduce(
      (acc: Record<string, number>, visit: Visit) => {
        const date = visit.visitedAt.toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {}
    );

    const chartData = Object.entries(dailyVisits)
      .map(([date, visits]) => ({ date, visits }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return chartData;
  } catch (error) {
    console.error("Error fetching daily profile visits:", error);
    return null;
  }
};

// Recent visitors
export const getRecentProfileVisitors = async (
  userId: string,
  limit: number = 10
) => {
  try {
    return await db.profileAnalytics.findMany({
      where: { userId },
      orderBy: { visitedAt: "desc" },
      take: limit,
      select: { visitedAt: true, visitorIp: true },
    });
  } catch (error) {
    console.error("Error fetching recent profile visitors:", error);
    return null;
  }
};

// Get user analytics
export const getUserAnalytics = async (userId: string) => {
  try {
    const profileAnalytics = await getProfileVistCount(userId);

    const userLinks = await db.link.findMany({
      where: { userId },
      select: { id: true, title: true, clickCount: true, createdAt: true },
    });

    const totalLinkClicks = userLinks.reduce(
      (sum, link) => sum + link.clickCount,
      0
    );

    const linkAnalytics = await Promise.all(
      userLinks.map(async (link) => {
        const analytics = await getLinkAnalytics(link.id);
        return { linkId: link.id, title: link.title, ...analytics };
      })
    );

    const mostClickedLink =
      userLinks.reduce((max, link) =>
        link.clickCount > (max?.clickCount || 0) ? link : max
        , null as typeof userLinks[0] | null) || null;

    return {
      profileAnalytics,
      totalLinkClicks,
      totalLinks: userLinks.length,
      linkAnalytics,
      mostClickedLink,
    };
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return null;
  }
};

// Log link click
export const logLinkClick = async (linkId: string, clickerIp?: string) => {
  try {
    const linkExists = await db.link.findUnique({
      where: { id: linkId },
      select: { id: true, title: true },
    });

    if (!linkExists) return null;

    const headersList = await headers();
    let ip =
      clickerIp ||
      headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip") ||
      headersList.get("cf-connecting-ip") ||
      "unknown";

    ip = normalizeIP(ip.trim());

    return await db.$transaction(async (tx) => {
      const analytics = await tx.linkAnalytics.create({
        data: { linkId, clickerIp: ip, clickedAt: new Date() },
      });

      await tx.link.update({
        where: { id: linkId },
        data: { clickCount: { increment: 1 } },
      });

      return analytics;
    });
  } catch (error) {
    console.error("Error logging link click:", error);
    try {
      await db.link.update({
        where: { id: linkId },
        data: { clickCount: { increment: 1 } },
      });
    } catch (fallbackError) {
      console.error("Fallback increment also failed:", fallbackError);
    }
    return null;
  }
};

// Get link analytics
export const getLinkAnalytics = async (linkId: string) => {
  try {
    const totalClicks = await db.linkAnalytics.count({ where: { linkId } });

    const uniqueClicks = await db.linkAnalytics.groupBy({
      by: ["clickerIp"],
      where: { linkId },
      _count: { id: true },
    });

    const periodCounts = await Promise.all([
      db.linkAnalytics.count({
        where: { linkId, clickedAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
      }),
      db.linkAnalytics.count({
        where: { linkId, clickedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
      }),
      db.linkAnalytics.count({
        where: { linkId, clickedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      }),
      db.linkAnalytics.count({
        where: { linkId, clickedAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      }),
    ]);

    const recentClicks = await db.linkAnalytics.findMany({
      where: { linkId },
      orderBy: { clickedAt: "desc" },
      take: 10,
      select: { clickedAt: true, clickerIp: true },
    });

    return {
      totalClicks,
      uniqueClicks: uniqueClicks.length,
      clicksLast1Hour: periodCounts[0],
      clicksLast24Hours: periodCounts[1],
      clicksLast7Days: periodCounts[2],
      clicksLast30Days: periodCounts[3],
      recentClicks,
    };
  } catch (error) {
    console.error("Error fetching link analytics:", error);
    return null;
  }
};

// Daily link clicks
export const getDailyLinkClicks = async (linkId: string, days: number = 30) => {
  try {
    type Click = { clickedAt: Date };
    const clicks: Click[] = await db.linkAnalytics.findMany({
      where: { linkId, clickedAt: { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) } },
      select: { clickedAt: true },
      orderBy: { clickedAt: "desc" },
    });

    const dailyClicks: Record<string, number> = clicks.reduce((acc, click) => {
      const date = click.clickedAt.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(dailyClicks)
      .map(([date, clicks]) => ({ date, clicks }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error("Error fetching daily link clicks:", error);
    return null;
  }
};

// Top links
export const getTopLinks = async (userId: string, limit: number = 5) => {
  try {
    return await db.link.findMany({
      where: { userId },
      orderBy: { clickCount: "desc" },
      take: limit,
      select: { id: true, title: true, url: true, clickCount: true, createdAt: true },
    });
  } catch (error) {
    console.error("Error fetching top links:", error);
    return null;
  }
};

// Analytics summary
export const getAnalyticsSummary = async (userId: string) => {
  try {
    const [profileVisits, totalLinks, totalLinkClicksAgg] = await Promise.all([
      getProfileVistCount(userId),
      db.link.count({ where: { userId } }),
      db.link.aggregate({ where: { userId }, _sum: { clickCount: true } }),
    ]);

    const topLink = await db.link.findFirst({
      where: { userId },
      orderBy: { clickCount: "desc" },
      select: { title: true, clickCount: true },
    });

    return {
      profileVisits,
      totalLinks,
      totalLinkClicks: totalLinkClicksAgg._sum.clickCount || 0,
      topLink,
    };
  } catch (error) {
    console.error("Error fetching analytics summary:", error);
    return null;
  }
};
