// 通用配置常量
const GENERAL_CONFIG = {
  "mixed-port": 7890,
  "allow-lan": true,
  "bind-address": "*",
  "ipv6": true,
  "unified-delay": true
};

// 程序入口
function main(config) {
  if (!config?.proxies?.length) {
    throw new Error("配置文件中未找到任何代理");
  }

  config["dns"] = dnsConfig;
  config["proxy-groups"] = proxyGroupConfig;
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  Object.assign(config, GENERAL_CONFIG);
  return config;
}

// DNS配置
const dnsConfig = {
  "enable": true,
  "ipv6": true,
  "listen": ":53",
  "prefer-h3": false,
  "respect-rules": true,
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    "+.lan",
    "+.local",
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    "localhost.work.weixin.qq.com"
  ],
  "use-hosts": false,
  "use-system-hosts": false,
  "nameserver": [
    "https://doh.pub/dns-query",
    "https://dns.alidns.com/dns-query",
    "https://1.1.1.1/dns-query",
    "https://dns.google/dns-query"
  ],
  "default-nameserver": ["tls://223.5.5.5", "tls://119.29.29.29"],
  "proxy-server-nameserver": ["https://doh.pub/dns-query"],
  "direct-nameserver": ["https://doh.pub/dns-query", "https://dns.alidns.com/dns-query"]
};

// 代理组基础配置（不过滤，用于 Proxy / AUTO 全节点组）
const groupBase = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.gstatic.com/generate_204",
  "max-failed-times": 3,
  "hidden": false
};

// 代理组基础配置（过滤信息节点，用于地区组和服务组）
const groupBaseFiltered = {
  ...groupBase,
  "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置"
};

// 代理组规则
const proxyGroupConfig = [
  // === 核心代理组 ===
  {
    ...groupBase,
    "name": "Proxy",
    "type": "select",
    "proxies": ["AUTO", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT", "REJECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png"
  },
  {
    ...groupBase,
    "name": "AUTO",
    "type": "url-test",
    "include-all": true,
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png"
  },

  // === 系统服务 ===
  {
    ...groupBaseFiltered,
    "name": "Apple",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "REJECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Apple.png"
  },

  // === 通讯社交 ===
  {
    ...groupBaseFiltered,
    "name": "Telegram",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT", "REJECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram.png"
  },
  {
    ...groupBaseFiltered,
    "name": "Twitter",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitter.png"
  },

  // === AI 服务 ===
  {
    ...groupBaseFiltered,
    "name": "OpenAI",
    "type": "select",
    "proxies": ["Proxy", "US", "TW", "JP", "KR", "HK", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png"
  },
  {
    ...groupBaseFiltered,
    "name": "Gemini",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/guaishouxiaoqi/icons@master/Color/Gemini.png"
  },
  {
    ...groupBaseFiltered,
    "name": "Claude",
    "type": "select",
    "proxies": ["Proxy", "US", "TW", "JP", "KR", "HK", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/ke1ewang/Qi@master/Claude.png"
  },

  // === 开发平台 ===
  {
    ...groupBaseFiltered,
    "name": "Github",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/GitHub.png"
  },

  // === 流媒体 ===
  {
    ...groupBaseFiltered,
    "name": "YouTube",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT", "REJECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png"
  },
  {
    ...groupBaseFiltered,
    "name": "BiliBili",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "REJECT", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili.png"
  },
  {
    ...groupBaseFiltered,
    "name": "TikTok",
    "type": "select",
    "proxies": ["Proxy", "TW", "HK", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok.png"
  },
  {
    ...groupBaseFiltered,
    "name": "Spotify",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Spotify.png"
  },
  {
    ...groupBaseFiltered,
    "name": "Netflix",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netflix.png"
  },
  {
    ...groupBaseFiltered,
    "name": "Disney",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Disney.png"
  },
  {
    ...groupBaseFiltered,
    "name": "Emby",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Emby.png"
  },

  // === 搜索引擎 ===
  {
    ...groupBaseFiltered,
    "name": "Google",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google_Search.png"
  },

  // === 微软服务 ===
  {
    ...groupBaseFiltered,
    "name": "OneDrive",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/OneDrive.png"
  },
  {
    ...groupBaseFiltered,
    "name": "Microsoft",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "REJECT", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Microsoft.png"
  },

  // === 游戏平台 ===
  {
    ...groupBaseFiltered,
    "name": "Steam",
    "type": "select",
    "proxies": ["Proxy", "HK", "DIRECT", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Steam.png"
  },

  // === 社区论坛 ===
  {
    ...groupBaseFiltered,
    "name": "LinuxDo",
    "type": "select",
    "proxies": ["HK", "DIRECT", "Proxy", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
    "include-all": true,
    "icon": "https://img.shimoxi.qzz.io/img/linux%20do-logo_2025110721_e85ac2b2b9f5adb3.png"
  },

  // === 地区节点（自动测速） ===
  {
    ...groupBaseFiltered,
    "name": "HK",
    "type": "url-test",
    "include-all": true,
    "filter": "香港|HK|🇭🇰",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png"
  },
  {
    ...groupBaseFiltered,
    "name": "TW",
    "type": "url-test",
    "include-all": true,
    "filter": "台湾|TW|🇹🇼",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png"
  },
  {
    ...groupBaseFiltered,
    "name": "JP",
    "type": "url-test",
    "include-all": true,
    "filter": "日本|JP|🇯🇵",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png"
  },
  {
    ...groupBaseFiltered,
    "name": "KR",
    "type": "url-test",
    "include-all": true,
    "filter": "韩国|KR|🇰🇷",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Korea.png"
  },
  {
    ...groupBaseFiltered,
    "name": "US",
    "type": "url-test",
    "include-all": true,
    "filter": "美国|US|🇺🇸",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png"
  },
  {
    ...groupBaseFiltered,
    "name": "DE",
    "type": "url-test",
    "include-all": true,
    "filter": "德国|DE|🇩🇪",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Germany.png"
  },
  {
    ...groupBaseFiltered,
    "name": "SG",
    "type": "url-test",
    "include-all": true,
    "filter": "新加坡|SG|🇸🇬",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png"
  },
  {
    ...groupBaseFiltered,
    "name": "FR",
    "type": "url-test",
    "include-all": true,
    "filter": "法国|FR|🇫🇷",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/France.png"
  },
  {
    ...groupBaseFiltered,
    "name": "UK",
    "type": "url-test",
    "include-all": true,
    "filter": "英国|GB|🇬🇧",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_Kingdom.png"
  }
];

// 规则集通用配置（yaml 格式，用于 blackmatrix7 和自托管规则）
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400,
  "proxy": "Proxy"
};

// 规则集通用配置（text 格式，用于 Loyalsoldier clash-rules）
const ruleProviderCommonTxt = {
  "type": "http",
  "format": "text",
  "interval": 86400,
  "proxy": "Proxy"
};

// 规则集配置
const ruleProviders = {
  // Loyalsoldier 中国路由规则
  "lancidr":     { ...ruleProviderCommonTxt, "behavior": "ipcidr",    "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",  "path": "./ruleset/lancidr.yaml" },
  "direct":      { ...ruleProviderCommonTxt, "behavior": "domain",    "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",   "path": "./ruleset/direct.yaml" },
  "cncidr":      { ...ruleProviderCommonTxt, "behavior": "ipcidr",    "url": "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",   "path": "./ruleset/cncidr.yaml" },
  // 自托管规则
  "ChinaCustom": { ...ruleProviderCommon,    "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/shimoxi123/DaiLi/rule/ChinaCustom.yaml",        "path": "./ruleset/ChinaCustom.yaml" },
  "DNSLeak":     { ...ruleProviderCommon,    "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/shimoxi123/DaiLi/rule/DNSLeak.yaml",            "path": "./ruleset/DNSLeak.yaml" },
  // 服务规则
  "Apple":     { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Apple/Apple_Classical.yaml",       "path": "./ruleset/Apple.yaml" },
  "Telegram":  { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Telegram/Telegram.yaml",           "path": "./ruleset/Telegram.yaml" },
  "Twitter":   { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Twitter/Twitter.yaml",             "path": "./ruleset/Twitter.yaml" },
  "OpenAI":    { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",               "path": "./ruleset/OpenAI.yaml" },
  "Gemini":    { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Gemini/Gemini.yaml",               "path": "./ruleset/Gemini.yaml" },
  "Claude":    { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Claude/Claude.yaml",               "path": "./ruleset/Claude.yaml" },
  "Github":    { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GitHub/GitHub_No_Resolve.yaml",    "path": "./ruleset/Github.yaml" },
  "YouTube":   { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/YouTube/YouTube.yaml",             "path": "./ruleset/YouTube.yaml" },
  "BiliBili":  { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BiliBili/BiliBili.yaml",           "path": "./ruleset/BiliBili.yaml" },
  "TikTok":    { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/TikTok/TikTok.yaml",               "path": "./ruleset/TikTok.yaml" },
  "Spotify":   { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Spotify/Spotify.yaml",             "path": "./ruleset/Spotify.yaml" },
  "Netflix":   { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Netflix/Netflix.yaml",             "path": "./ruleset/Netflix.yaml" },
  "Disney":    { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Disney/Disney.yaml",               "path": "./ruleset/Disney.yaml" },
  "Emby":      { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Emby/Emby.yaml",                   "path": "./ruleset/Emby.yaml" },
  "Google":    { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Google/Google.yaml",               "path": "./ruleset/Google.yaml" },
  "OneDrive":  { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OneDrive/OneDrive.yaml",           "path": "./ruleset/OneDrive.yaml" },
  "Microsoft": { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml",         "path": "./ruleset/Microsoft.yaml" },
  "Steam":     { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Steam/Steam.yaml",                 "path": "./ruleset/Steam.yaml" },
  "Hijacking": { ...ruleProviderCommon, "behavior": "classical", "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Hijacking/Hijacking.yaml",         "path": "./ruleset/Hijacking.yaml" },
};

// 规则（与 config.yaml 保持一致）
const rules = [
  // 特殊路由（linux.do 解析到国际 IP，须在中国规则之前）
  "DOMAIN-SUFFIX,linux.do,LinuxDo",

  // 局域网直连
  "RULE-SET,lancidr,DIRECT,no-resolve",

  // IP 检测站点走代理，防止 DNS 泄露
  "RULE-SET,DNSLeak,Proxy",

  // 中国直连（自定义 → 域名列表 → IP 段）
  "RULE-SET,ChinaCustom,DIRECT",
  "RULE-SET,direct,DIRECT",
  "RULE-SET,cncidr,DIRECT,no-resolve",

  // 服务规则
  "RULE-SET,Apple,Apple",
  "RULE-SET,Telegram,Telegram",
  "RULE-SET,Twitter,Twitter",
  "RULE-SET,OpenAI,OpenAI",
  "RULE-SET,Gemini,Gemini",
  "RULE-SET,Claude,Claude",
  "RULE-SET,Github,Github",
  "RULE-SET,YouTube,YouTube",
  "RULE-SET,BiliBili,BiliBili",
  "RULE-SET,TikTok,TikTok",
  "RULE-SET,Spotify,Spotify",
  "RULE-SET,Netflix,Netflix",
  "RULE-SET,Disney,Disney",
  "RULE-SET,Emby,Emby",
  "RULE-SET,Google,Google",
  "RULE-SET,OneDrive,OneDrive",
  "RULE-SET,Microsoft,Microsoft",
  "RULE-SET,Steam,Steam",

  // 劫持防护
  "RULE-SET,Hijacking,DIRECT",

  // 默认规则（必须在最后）
  "MATCH,Proxy"
];
