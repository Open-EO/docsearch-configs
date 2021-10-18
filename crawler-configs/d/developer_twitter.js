new Crawler({
  appId: "",
  apiKey: "",
  rateLimit: 8,
  startUrls: [
    "https://developer.twitter.com/en/docs",
    "https://developer.twitter.com/",
  ],
  renderJavaScript: false,
  sitemaps: [],
  exclusionPatterns: ["**/**.html", "**/changelog/**"],
  ignoreCanonicalTo: false,
  discoveryPatterns: ["https://developer.twitter.com/**"],
  schedule: "at 15:00 on Tuesday",
  actions: [
    {
      indexName: "developer_twitter",
      pathsToMatch: ["https://developer.twitter.com/en/docs**/**"],
      recordExtractor: ({ $, helpers }) => {
        // Stop if one of those text is found in the DOM.
        const body = $.text();
        const toCheck = ["<----Inject HTML content here---->"];
        const shouldStop = toCheck.some((text) => body.includes(text));
        if (shouldStop) {
          return [];
        } // Removing DOM elements we don't want to crawl
        const toRemove = ".tabs-nav__toc";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: ".main-content h1",
            content: ".main-content p, .main-content li",
            lvl0: {
              selectors: "li.open > a",
              defaultValue: "Documentation",
            },
            lvl2: ".main-content h2",
            lvl3: ".main-content h3",
            lvl4: ".main-content h4",
          },
          indexHeadings: { from: 2, to: 6 },
        });
      },
    },
    {
      indexName: "developer_twitter",
      pathsToMatch: ["https://developer.twitter.com/en/docs**/**"],
      recordExtractor: ({ $, helpers }) => {
        // Stop if one of those text is found in the DOM.
        const body = $.text();
        const toCheck = ["<----Inject HTML content here---->"];
        const shouldStop = toCheck.some((text) => body.includes(text));
        if (shouldStop) {
          return [];
        } // Removing DOM elements we don't want to crawl
        const toRemove = ".tabs-nav__toc";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: ".main-content h1",
            content: ".main-content p, .main-content li",
            lvl0: {
              selectors: "li.open > a",
              defaultValue: "Documentation",
            },
            lvl2: ".main-content h2",
            lvl3: ".main-content h3",
            lvl4: ".main-content h4",
            lang: {
              defaultValue: ["en"],
            },
          },
          indexHeadings: { from: 2, to: 6 },
        });
      },
    },
  ],
  initialIndexSettings: {
    developer_twitter: {
      attributesForFaceting: ["type", "lang"],
      attributesToRetrieve: ["hierarchy", "content", "anchor", "url"],
      attributesToHighlight: ["hierarchy", "hierarchy_camel", "content"],
      attributesToSnippet: ["content:10"],
      camelCaseAttributes: ["hierarchy", "hierarchy_radio", "content"],
      searchableAttributes: [
        "unordered(hierarchy_radio_camel.lvl0)",
        "unordered(hierarchy_radio.lvl0)",
        "unordered(hierarchy_radio_camel.lvl1)",
        "unordered(hierarchy_radio.lvl1)",
        "unordered(hierarchy_radio_camel.lvl2)",
        "unordered(hierarchy_radio.lvl2)",
        "unordered(hierarchy_radio_camel.lvl3)",
        "unordered(hierarchy_radio.lvl3)",
        "unordered(hierarchy_radio_camel.lvl4)",
        "unordered(hierarchy_radio.lvl4)",
        "unordered(hierarchy_radio_camel.lvl5)",
        "unordered(hierarchy_radio.lvl5)",
        "unordered(hierarchy_radio_camel.lvl6)",
        "unordered(hierarchy_radio.lvl6)",
        "unordered(hierarchy_camel.lvl0)",
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy_camel.lvl1)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy_camel.lvl2)",
        "unordered(hierarchy.lvl2)",
        "unordered(hierarchy_camel.lvl3)",
        "unordered(hierarchy.lvl3)",
        "unordered(hierarchy_camel.lvl4)",
        "unordered(hierarchy.lvl4)",
        "unordered(hierarchy_camel.lvl5)",
        "unordered(hierarchy.lvl5)",
        "unordered(hierarchy_camel.lvl6)",
        "unordered(hierarchy.lvl6)",
        "content",
      ],
      distinct: true,
      attributeForDistinct: "url",
      customRanking: [
        "desc(weight.pageRank)",
        "desc(weight.level)",
        "asc(weight.position)",
      ],
      ranking: [
        "words",
        "filters",
        "typo",
        "attribute",
        "proximity",
        "exact",
        "custom",
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: "</span>",
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: "allOptional",
    },
  },
});