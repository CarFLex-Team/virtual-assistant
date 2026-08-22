const CHART_COLORS = [
  "#38BDF8",
  "#818CF8",
  "#F59E0B",
  "#34D399",
  "#F87171",

  "#F472B6",
];

const DashboardData = {
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

export default DashboardData;
