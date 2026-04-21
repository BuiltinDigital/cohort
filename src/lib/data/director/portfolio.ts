export interface PortfolioKPIs {
  totalRevenueYTD: number;
  deliveryConfidence: number;
  deliveryConfidenceDelta: number;
  commissionCostPercent: number;
  forecastVsPlan: number;
  forecastVsPlanDelta: number;
  activeTeams: number;
  totalSalespeople: number;
  activeCampaigns: number;
  quarterDaysRemaining: number;
}

export const portfolioKPIs: PortfolioKPIs = {
  totalRevenueYTD: 12_500_000,
  deliveryConfidence: 84,
  deliveryConfidenceDelta: 2,
  commissionCostPercent: 5.6,
  forecastVsPlan: 97,
  forecastVsPlanDelta: 3,
  activeTeams: 3,
  totalSalespeople: 7,
  activeCampaigns: 42,
  quarterDaysRemaining: 47,
};
