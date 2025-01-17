import { TBusinessReport } from '@/domains/business-reports/fetchers';
import { createReportAdapter } from '@/domains/business-reports/create-report-adapter/create-report-adapter';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { WebsitesCompany } from '@/domains/business-reports/components/WebsitesCompany/WebsitesCompany';
import { WebsiteLineOfBusiness } from '@/domains/business-reports/components/WebsiteLineOfBusiness/WebsiteLineOfBusiness';
import { WebsiteCredibility } from '@/domains/business-reports/components/WebsiteCredibility/WebsiteCredibility';
import { EcosystemAndTransactions } from '@/domains/business-reports/components/EcosystemAndTransactions/EcosystemAndTransactions';
import { AdsAndSocialMedia } from '@/domains/business-reports/components/AdsAndSocialMedia/AdsAndSocialMedia';
import { useSearchParamsByEntity } from '@/common/hooks/useSearchParamsByEntity/useSearchParamsByEntity';
import { useLocation } from 'react-router-dom';

export const useWebsiteMonitoringBusinessReportTab = ({
  businessReport,
}: {
  businessReport: TBusinessReport;
}) => {
  const adapter = createReportAdapter({
    reportVersion: businessReport?.report?.version,
  });
  const {
    websitesCompanyAnalysis,
    websiteCredibilityAnalysis,
    adsAndSocialMediaAnalysis,
    adsAndSocialMediaPresence,
    websiteLineOfBusinessAnalysis,
    ecosystemAndTransactionsAnalysis,
    summary,
    riskScore,
    riskLevels,
    companyReputationAnalysis,
    relatedAdsSummary,
    lineOfBusinessDescription,
    onlineReputationAnalysis,
    pricingAnalysis,
    websiteStructureAndContentEvaluation,
    trafficAnalysis,
    ecosystemAndTransactionsMatches,
    adsImages,
    relatedAdsImages,
  } = adapter(businessReport ?? {});
  const tabs = useMemo(
    () =>
      [
        {
          label: "Website's Company",
          value: 'websitesCompany',
          content: (
            <WebsitesCompany
              companyName={businessReport?.business?.companyName ?? ''}
              companyReputationAnalysis={companyReputationAnalysis ?? []}
              violations={websitesCompanyAnalysis ?? []}
            />
          ),
        },
        {
          label: 'Website Line of Business',
          value: 'websiteLineOfBusiness',
          content: (
            <WebsiteLineOfBusiness
              violations={websiteLineOfBusinessAnalysis ?? []}
              description={lineOfBusinessDescription}
            />
          ),
        },
        {
          label: 'Website Credibility',
          value: 'websiteCredibility',
          content: (
            <WebsiteCredibility
              violations={websiteCredibilityAnalysis ?? []}
              onlineReputationAnalysis={onlineReputationAnalysis ?? []}
              pricingAnalysis={pricingAnalysis}
              websiteStructureAndContentEvaluation={websiteStructureAndContentEvaluation}
              trafficAnalysis={trafficAnalysis}
            />
          ),
        },
        {
          label: 'Ecosystem and Transactions',
          value: 'ecosystemAndTransactions',
          content: (
            <EcosystemAndTransactions
              violations={ecosystemAndTransactionsAnalysis ?? []}
              matches={ecosystemAndTransactionsMatches ?? []}
            />
          ),
        },
        {
          label: 'Ads and Social Media',
          value: 'adsAndSocialMedia',
          content: (
            <AdsAndSocialMedia
              violations={adsAndSocialMediaAnalysis ?? []}
              mediaPresence={adsAndSocialMediaPresence ?? []}
              adsImages={adsImages}
              relatedAdsImages={relatedAdsImages}
              relatedAdsSummary={relatedAdsSummary}
            />
          ),
        },
      ] as const satisfies ReadonlyArray<{
        label: string;
        value: string;
        content: ReactNode | ReactNode[];
      }>,
    [
      adsAndSocialMediaAnalysis,
      adsAndSocialMediaPresence,
      adsImages,
      companyReputationAnalysis,
      ecosystemAndTransactionsAnalysis,
      ecosystemAndTransactionsMatches,
      lineOfBusinessDescription,
      onlineReputationAnalysis,
      pricingAnalysis,
      relatedAdsImages,
      relatedAdsSummary,
      trafficAnalysis,
      websiteCredibilityAnalysis,
      websiteLineOfBusinessAnalysis,
      websiteStructureAndContentEvaluation,
      websitesCompanyAnalysis,
    ],
  );
  const [{ activeMonitoringTab }] = useSearchParamsByEntity();
  const { search } = useLocation();
  const getUpdatedSearchParamsWithActiveMonitoringTab = useCallback(
    ({ tab, search }: { tab: string; search: string }) => {
      const searchParams = new URLSearchParams(search);

      searchParams.set('activeMonitoringTab', tab);

      return searchParams.toString();
    },
    [],
  );
  const riskIndicators = [
    {
      title: "Website's Company Analysis",
      search: getUpdatedSearchParamsWithActiveMonitoringTab({ tab: 'websitesCompany', search }),
      violations: websitesCompanyAnalysis ?? [],
    },
    {
      title: 'Website Credibility Analysis',
      search: getUpdatedSearchParamsWithActiveMonitoringTab({ tab: 'websiteCredibility', search }),
      violations: websiteCredibilityAnalysis,
    },
    {
      title: 'Ads and Social Media Analysis',
      search: getUpdatedSearchParamsWithActiveMonitoringTab({ tab: 'adsAndSocialMedia', search }),
      violations: adsAndSocialMediaAnalysis ?? [],
    },
    {
      title: 'Website Line of Business Analysis',
      search: getUpdatedSearchParamsWithActiveMonitoringTab({
        tab: 'websiteLineOfBusiness',
        search,
      }),
      violations: websiteLineOfBusinessAnalysis ?? [],
    },
    {
      title: 'Ecosystem and Transactions Analysis',
      search: getUpdatedSearchParamsWithActiveMonitoringTab({
        tab: 'ecosystemAndTransactions',
        search,
      }),
      violations: ecosystemAndTransactionsAnalysis ?? [],
    },
  ] as const satisfies ReadonlyArray<{
    title: string;
    search: string;
    violations: Array<{
      label: string;
      severity: string;
    }>;
  }>;

  return {
    activeMonitoringTab,
    riskIndicators,
    riskLevels,
    riskScore,
    tabs,
    summary,
    getUpdatedSearchParamsWithActiveMonitoringTab,
    search,
  };
};
