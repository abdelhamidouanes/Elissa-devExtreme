export const navigation = [
  {
    text: 'Dashboard',
    path: '/home',
    icon: 'fas fa-tachometer-alt'
  },
  {
    text: 'Products / Components',
    icon: 'fab fa-product-hunt',
    isExpanded: false,    
    items: [
      {
        text: 'Products / Components',
        path: '/productscomponents'
      },
      {
        text: 'Products / Components Versions',
        path: '/productscomponentsversions'
      }
    ]
  },
  {
    text: 'Test Cases',
    path: '/testcases',
    icon: 'fas fa-medkit'
  },
  {
    text: 'Test Sessions',
    icon: 'fas fa-play',
    isExpanded: false,
    items: [
      {
        text: 'Test Session',
        path: '/testsession'
      },
      {
        text: 'Test Case Run',
        path: '/testcaserun'
      }
    ]
  },
  {
    text: 'Test Case Runs Analysis',
    path: '/testcaserunsanalysis',
    icon: 'fas fa-bug'
  },
  {
    text: 'Reports',
    icon: 'fas fa-chart-pie',
    isExpanded: false,
    items: [
      {
        text: 'Total Bugs',
        path: '/totalbugs'
      },
      {
        text: 'Total Test Sessions',
        path: '/totaltestsessions'
      },
      {
        text: 'Test Sessions Compare',
        path: '/testsessionscompare'
      },
      {
        text: 'Total Test Cases Run',
        path: '/totaltestcasesrun'
      },
      {
        text: 'Test Cases Run Compare',
        path: '/testcasesruncompare'
      },
      {
        text: 'Test Sessions Evolution',
        path: '/testsessionsevolution'
      },
      {
        text: 'Test Cases Run Evolution',
        path: '/testcasesrunevolution'
      },
      {
        text: 'Runtime Evolution by AT code Revision',
        path: '/runtimeevolutionbyatcoderevision'
      },
      {
        text: 'Runtime Evolution by Product Version',
        path: '/runtimeevolutionbyproductversion'
      },
      {
        text: 'Test Cases Runtime Evolution',
        path: '/testcasesruntimeevolution'
      }
    ]
  },
  {
    text: 'Delivery',
    path: '/delivery',
    icon: 'fas fa-truck'
  },
  {
    text: 'Events',
    path: '/events',
    icon: 'far fa-calendar-alt'
  },
  {
    text: 'History',
    icon: 'fas fa-history',
    isExpanded: false,
    items: [
      {
        text: 'Elissa',
        path: '/historyElissa'
      },
      {
        text: 'Projector',
        path: '/historyProjector'
      },
      {
        text: 'Logs',
        path: '/historyLogs'
      }
    ]
  },
  {
    text: 'Settings',
    icon: 'fas fa-cog',
    isExpanded: false,
    items: [
      {
        text: 'Users',
        path: '/settingsusers'
      },
      {
        text: 'ATBox',
        path: '/settingsatbox'
      }
    ]
  }
];
