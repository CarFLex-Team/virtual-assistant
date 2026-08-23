const CHART_COLORS = [
  "#38BDF8",
  "#818CF8",
  "#F59E0B",
  "#34D399",
  "#F87171",

  "#F472B6",
];
export const BriefData = {
  e01: {
    aiMonitorSection: [
      "All systems running normally",
      "Predictive Risk Score: 51.49 / 100 (Moderate)",
    ],
    executiveSummarySection: {
      title:
        "Current customer base stands at 14,750 with 1,965,812.71 AED in active open balances.",
      cards: [
        {
          title: "Financial Health Score:",
          value: "33.45",
        },
        {
          title: "Average overdue duration:",
          value: "138.86 days",
        },
      ],
    },
    criticalAlertsSection: [
      "25 high-risk overdue accounts above 50 AED",
      "Overdue exposure between 31-60 days: 115,713.54 AED",
      "Top 5 customers represent 86.49% of total overdue value (collective)",
    ],
    aiHighlightsSection: [
      "Natural customer attrition trending within expected range",
      "Primary Supplier: GAMMA STAR AUTO SPARE PARTS LLC",
      "Collection pressure metrics concentrated among high-value customer accounts",
      "Overdue review concentration may impact short term operational liquidity",
    ],
    recommendedActionsSection: [
      "Prioritize outreach for accounts overdue more than 30 days",
      "Review high-value customer accounts against financial risk thresholds",
      "Review concentration among customers with significant overdue exposure",
      "Monitor supplier dependency and purchase-value concentration",
    ],
    forecast:
      "Forecasted next-period risk may increase within the next 14 days if current payment behavior continues.",
    operationalStatusSection: [
      "Active Customers: 14,750",
      "High Risk Accounts: 31",
      "Responded Suppliers: 180",
      "AI Monitoring Engines: Real-time",
    ],
  },
  e02: {
    aiMonitorSection: [
      "Local data package validation: PASSED",
      "20,968 sales invoices and 30,672 sales lines analyzed",
      "Average modeled customer risk score: 11.87 / 100 (Low)",
    ],
    executiveSummarySection: {
      title:
        "Inventory classifications remain provisional until Winter and All-Season tire seasonality is applied.",
      cards: [
        {
          title: "Inventory Value at Last Cost:",
          value: "$807,531.52",
        },
        {
          title: "Available Inventory:",
          value: "10,572 Units",
        },
      ],
    },
    criticalAlertsSection: [
      "21 customers are classified as High or Critical risk: 13 Critical and 8 High.",
      "$44,655 of modeled 90-day revenue at risk is associated with High and Critical customers.",
      "The top 5 customers represent 41.02% of total modeled customer revenue at risk.",
    ],
    aiHighlightsSection: [
      "98 customers are currently classified as Active.",
      "67 customers require business follow-up: 29 Declining, 21 At Risk, and 17 Lapsed.",
      "116 customers remain Not Assessed because their purchase history is insufficient.",
      "The supplier master contains 33 suppliers, including 23 suppliers with purchase orders.",
      "The primary external supplier by purchase-line value is ShangHai Durotyre International Trading Co Ltd, with $1,256,169.31 in recorded purchase-line value.",
      "52 SKUs are currently classified as Dead Stock, Slow Moving, or Never Sold, representing 917 units and $99,260.48 at last cost.",
    ],
    recommendedActionsSection: [
      "Prioritize follow-up with the 13 Critical and 8 High-risk customers.",
      "Review the 67 customers classified as Declining, At Risk, or Lapsed.",
      "Validate the 116 Not Assessed customers and collect sufficient purchase history where possible.",
      "Review the 52 Dead Stock, Slow-Moving, and Never-Sold SKUs after adding Winter and All-Season classification.",
      "Validate supplier concentration across the 33 registered suppliers and 23 suppliers with purchase orders.",
      "Configure the approved Minimum Margin and Reorder policies before enabling automated recommendations.",
    ],
    forecast:
      "Forecasted next-period risk may increase within the next 14 days if current payment behavior continues.",
    operationalStatusSection: [
      "Customer Master: 281",
      "Active Customers: 98",
      "Customers Active in Latest 90 Days: 140",
      "High/Critical Risk Customers: 21",
      "Customers Requiring Action: 67",
      "Suppliers: 33",
      "Suppliers with Purchase Orders: 23",
      "Sales Invoices Analyzed: 20,968",
      "Monitoring Mode: Snapshot-based",
    ],
  },
};
export const DashboardData = {
  e01data: {
    TopSellingItems: [
      {
        name: "Item C BODY KIT BMW G12 2016-2020 LCI M LOOK",
        amount: 140300,
      },
      {
        name: "Item C VPLKDSS001",
        amount: 137765,
      },
      {
        name: "Item 440-1915F-UE-DR",
        amount: 131952.9,
      },
      {
        name: "Item C 222 906 77 03/78 03-UPGRADE (BT)",
        amount: 125512.66,
      },
      {
        name: "Item C BODY KIT JETOUR T2 2023-DEFENDER LOOK-CONVERSION",
        amount: 123134,
      },
      {
        name: "Item C 205 906 64 04/65 04-UPGRADE 1",
        amount: 113412.72,
      },
      {
        name: "Item C 465 885 01 02-ASSY",
        amount: 102670,
      },
      {
        name: "Item C 463 520 77 00/78 00-ELECTRIC",
        amount: 100850,
      },
      {
        name: "Item C BODY KIT RR SPORT 2013-2018 AUTOBIOGRAPHY LOOK",
        amount: 85200,
      },
      {
        name: "Item C 167 698 47 01/48 01",
        amount: 77485.52,
      },
    ],

    agingData: [
      {
        name: "0-30",
        value: 5183765.35,
        color: CHART_COLORS[0],
      },
      {
        name: "31-90",
        value: 1772542.53,
        color: CHART_COLORS[2],
      },
      {
        name: "180+",
        value: 1151575.55,
        color: CHART_COLORS[4],
      },
      {
        name: "91-180",
        value: 1775363.03,
        color: CHART_COLORS[1],
      },
    ],

    inventoryPerWarehouse: [
      {
        name: "Main - Main Warehouse",
        amount: 9748546.06,
      },
      {
        name: "Claims - Claims Warehouse",
        amount: 112618.17,
      },
      {
        name: "Damage - Damage Warehouse",
        amount: 22082.23,
      },
    ],

    salesData: [
      {
        period: "2026-01",
        sales: 3019385.44,
        purchases: 2066780.22,
      },
      {
        period: "2026-02",
        sales: 3583660.21,
        purchases: 1174193.18,
      },
      {
        period: "2026-03",
        sales: 1864471.19,
        purchases: 1663000.15,
      },
      {
        period: "2026-04",
        sales: 2629137.27,
        purchases: 1148266.52,
      },
      {
        period: "2026-05",
        sales: 2102274.31,
        purchases: 380339.56,
      },
      {
        period: "2026-06",
        sales: 2170407.34,
        purchases: 1079581.4,
      },
    ],
  },

  e02data: {
    TopSellingItems: [
      {
        name: "Caraway CT921 ST205/75R15",
        amount: 98463.0,
      },
      {
        name: "Zeta Impero A/S 305/35R24",
        amount: 62211.0,
      },
      {
        name: "Zeta Meglio UHP 215/55R17",
        amount: 58548.99,
      },
      {
        name: "Zeta Verdant A/S 215/60R16",
        amount: 55453.0,
      },
      {
        name: "Zeta Impero A/S 245/45ZR20",
        amount: 48582.0,
      },
      {
        name: "Atlander Roverclaw R/T 35X12.50R20LT",
        amount: 48105.0,
      },
      {
        name: "Zeta Impero A/S 285/45R22",
        amount: 46500.0,
      },
      {
        name: "Atlander Roverclaw R/T 33X12.50R20LT",
        amount: 39218.56,
      },
      {
        name: "Zeta Verdant A/S 205/55R16",
        amount: 31913.0,
      },
      {
        name: "Zeta Etalon A/S 225/65R17",
        amount: 31851.93,
      },
    ],

    agingData: [
      {
        name: "0-30",
        value: 652066.57,
        color: CHART_COLORS[0],
      },
      {
        name: "31-90",
        value: 75307.57,
        color: CHART_COLORS[2],
      },
      {
        name: "91-180",
        value: 23482.2,
        color: CHART_COLORS[1],
      },
      {
        name: "180+",
        value: 3000.84,
        color: CHART_COLORS[4],
      },
      {
        name: "Never Sold",
        value: 57523.89,
        color: CHART_COLORS[5],
      },
    ],

    inventoryPerWarehouse: [
      {
        name: "UTU Tire",
        amount: 1864900.05,
      },
      {
        name: "Cash Customer",
        amount: 739721.18,
      },
      {
        name: "Johny tire ",
        amount: 504807.88,
      },
    ],

    salesData: [
      {
        period: "2026-01",
        sales: 297129.21,
        purchases: 237716.48,
      },
      {
        period: "2026-02",
        sales: 472754.2,
        purchases: 436353.6,
      },
      {
        period: "2026-03",
        sales: 607794.62,
        purchases: 451312.54,
      },
      {
        period: "2026-04",
        sales: 647996.64,
        purchases: 804333.6,
      },
      {
        period: "2026-05",
        sales: 542671.29,
        purchases: 410333.31,
      },
      {
        period: "2026-06",
        sales: 648303.53,
        purchases: 717939.07,
      },
    ],
  },
};
