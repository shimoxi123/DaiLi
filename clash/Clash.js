/**
 * 个人备份使用，该脚本适用与Mihomo Party和 Clash Verge Rev
 * Clash Verge Rev 全局扩展脚本（懒人配置）/ Mihomo Party 覆写脚本
 * URL: https://github.com/wanswu/my-backup
 */

// 多订阅合并功能已移除

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
  const proxyCount = config?.proxies?.length ?? 0;
  const originalProviders = config?.["proxy-providers"] || {};
  const proxyProviderCount = typeof originalProviders === "object" ? Object.keys(originalProviders).length : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;
  // 覆盖原配置中的代理组
  config["proxy-groups"] = proxyGroupConfig;
  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  // 覆盖通用配置
  Object.assign(config, GENERAL_CONFIG);
  // 返回修改后的配置
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
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "use-hosts": false,
  "use-system-hosts": false,
  "nameserver": [
    "https://doh.pub/dns-query",           // 国内（腾讯）
    "https://dns.alidns.com/dns-query",    // 国内（阿里）
    "https://1.1.1.1/dns-query",           // 国外（Cloudflare）
    "https://dns.google/dns-query"         // 国外（Google）
  ],
  "default-nameserver": ["tls://223.5.5.5", "tls://119.29.29.29"],  // 用于解析 DNS 服务器的域名
  "proxy-server-nameserver": ["https://doh.pub/dns-query"],         // 代理服务器域名解析
  "direct-nameserver": ["https://doh.pub/dns-query", "https://dns.alidns.com/dns-query"]  // 直连域名解析
};
// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.gstatic.com/generate_204",
  "max-failed-times": 3,
  "hidden": false,
  "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置"
};
// 代理组规则
const proxyGroupConfig = [
  // === 核心代理组 ===
  {
    ...groupBaseOption,
    "name": "Proxy",
    "type": "select",
    "proxies": ["AUTO", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT", "REJECT"],
    "include-all": true,
    "exclude-filter": undefined,  // 包含所有节点，不过滤
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png"
  },
  {
    ...groupBaseOption,
    "name": "AUTO",
    "type": "url-test",
    "include-all": true,
    "exclude-filter": undefined,  // 包含所有节点，不过滤
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Speedtest.png"
  },

  // === 系统服务 ===
  {
    ...groupBaseOption,
    "name": "Apple",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "REJECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Apple.png"
  },

  // === 通讯社交 ===
  {
    ...groupBaseOption,
    "name": "Telegram",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT", "REJECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Telegram.png"
  },
  {
    ...groupBaseOption,
    "name": "Twitter",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitter.png"
  },

  // === AI 服务 ===
  {
    ...groupBaseOption,
    "name": "OpenAI",
    "type": "select",
    "proxies": ["Proxy", "US", "TW", "JP", "KR", "HK", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png"
  },
  {
    ...groupBaseOption,
    "name": "Gemini",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/guaishouxiaoqi/icons@master/Color/Gemini.png"
  },
  {
    ...groupBaseOption,
    "name": "Claude",
    "type": "select",
    "proxies": ["Proxy", "US", "TW", "JP", "KR", "HK", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/ke1ewang/Qi@master/Claude.png"
  },

  // === 开发平台 ===
  {
    ...groupBaseOption,
    "name": "Github",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/GitHub.png"
  },

  // === 流媒体 ===
  {
    ...groupBaseOption,
    "name": "YouTube",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT", "REJECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png"
  },
  {
    ...groupBaseOption,
    "name": "BiliBili",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "REJECT", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili.png"
  },
  {
    ...groupBaseOption,
    "name": "TikTok",
    "type": "select",
    "proxies": ["Proxy", "TW", "HK", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok.png"
  },
  {
    ...groupBaseOption,
    "name": "Spotify",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Spotify.png"
  },
  {
    ...groupBaseOption,
    "name": "Netflix",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netflix.png"
  },
  {
    ...groupBaseOption,
    "name": "Disney",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Disney.png"
  },
  {
    ...groupBaseOption,
    "name": "Emby",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Emby.png"
  },

  // === 搜索引擎 ===
  {
    ...groupBaseOption,
    "name": "Google",
    "type": "select",
    "proxies": ["Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK", "DIRECT"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Google_Search.png"
  },

  // === 微软服务 ===
  {
    ...groupBaseOption,
    "name": "OneDrive",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/OneDrive.png"
  },
  {
    ...groupBaseOption,
    "name": "Microsoft",
    "type": "select",
    "proxies": ["DIRECT", "Proxy", "REJECT", "HK", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Microsoft.png"
  },

  // === 游戏平台 ===
  {
    ...groupBaseOption,
    "name": "Steam",
    "type": "select",
    "proxies": ["Proxy", "HK", "DIRECT", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
    "include-all": true,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Steam.png"
  },

  // === 社区论坛 ===
  {
    ...groupBaseOption,
    "name": "LinuxDo",
    "type": "select",
    "proxies": ["HK", "DIRECT", "Proxy", "TW", "JP", "KR", "US", "DE", "SG", "FR", "UK"],
    "include-all": true,
    "icon": "https://img.shimoxi.qzz.io/img/linux%20do-logo_2025110721_e85ac2b2b9f5adb3.png"
  },

  // === 地区节点（自动测速） ===
  {
    ...groupBaseOption,
    "name": "HK",
    "type": "url-test",
    "include-all": true,
    "filter": "香港|HK|🇭🇰",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png"
  },
  {
    ...groupBaseOption,
    "name": "TW",
    "type": "url-test",
    "include-all": true,
    "filter": "台湾|TW|🇹🇼",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png"
  },
  {
    ...groupBaseOption,
    "name": "JP",
    "type": "url-test",
    "include-all": true,
    "filter": "日本|JP|🇯🇵",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png"
  },
  {
    ...groupBaseOption,
    "name": "KR",
    "type": "url-test",
    "include-all": true,
    "filter": "韩国|KR|🇰🇷",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Korea.png"
  },
  {
    ...groupBaseOption,
    "name": "US",
    "type": "url-test",
    "include-all": true,
    "filter": "美国|US|🇺🇸",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png"
  },
  {
    ...groupBaseOption,
    "name": "DE",
    "type": "url-test",
    "include-all": true,
    "filter": "德国|DE|🇩🇪",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Germany.png"
  },
  {
    ...groupBaseOption,
    "name": "SG",
    "type": "url-test",
    "include-all": true,
    "filter": "新加坡|SG|🇸🇬",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png"
  },
  {
    ...groupBaseOption,
    "name": "FR",
    "type": "url-test",
    "include-all": true,
    "filter": "法国|FR|🇫🇷",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/France.png"
  },
  {
    ...groupBaseOption,
    "name": "UK",
    "type": "url-test",
    "include-all": true,
    "filter": "英国|GB|🇬🇧",
    "tolerance": 50,
    "icon": "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_Kingdom.png"
  }
];


// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400,
  "proxy": "Proxy"
};
// 规则集配置
const ruleProviders = {
  "Apple": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Apple/Apple_Classical.yaml",
    "path": "./ruleset/Apple.yaml"
  },
  "Telegram": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Telegram/Telegram.yaml",
    "path": "./ruleset/Telegram.yaml"
  },
  "YouTube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/YouTube/YouTube.yaml",
    "path": "./ruleset/YouTube.yaml"
  },
  "BiliBili": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BiliBili/BiliBili.yaml",
    "path": "./ruleset/BiliBili.yaml"
  },
  "TikTok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/TikTok/TikTok.yaml",
    "path": "./ruleset/TikTok.yaml"
  },
  "Spotify": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Spotify/Spotify.yaml",
    "path": "./ruleset/Spotify.yaml"
  },
  "Netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Netflix/Netflix.yaml",
    "path": "./ruleset/Netflix.yaml"
  },
  "Disney": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Disney/Disney.yaml",
    "path": "./ruleset/Disney.yaml"
  },
  "Google": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Google/Google.yaml",
    "path": "./ruleset/Google.yaml"
  },
  "OpenAI": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
    "path": "./ruleset/OpenAI.yaml"
  },
  "Microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Microsoft/Microsoft.yaml",
    "path": "./ruleset/Microsoft.yaml"
  },
  "Twitter": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Twitter/Twitter.yaml",
    "path": "./ruleset/Twitter.yaml"
  },
  "Steam": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Steam/Steam.yaml",
    "path": "./ruleset/Steam.yaml"
  },
  "OneDrive": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OneDrive/OneDrive.yaml",
    "path": "./ruleset/OneDrive.yaml"
  },
  "Emby": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Emby/Emby.yaml",
    "path": "./ruleset/Emby.yaml"
  },
  "Gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Gemini/Gemini.yaml",
    "path": "./ruleset/Gemini.yaml"
  },
  "Claude": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Claude/Claude.yaml",
    "path": "./ruleset/Claude.yaml"
  },
  "Github": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/GitHub/GitHub_No_Resolve.yaml",
    "path": "./ruleset/Github.yaml"
  },
};

// 规则
const rules = [
  // 需要特殊代理的域名（必须在 GEOIP 之前，避免被中国 IP 规则拦截）
  'DOMAIN-SUFFIX,linux.do,LinuxDo',

  // 自动直连规则
  'GEOIP,private,DIRECT',
  'GEOIP,CN,DIRECT',

  // 其他直连域名（中国 IP，可以被 GEOIP,CN 自动处理）
  'DOMAIN-SUFFIX,yunaq.com,DIRECT',
  'DOMAIN-SUFFIX,jiashule.com,DIRECT',
  'DOMAIN-SUFFIX,deepseek.com,DIRECT',
  'DOMAIN-SUFFIX,volces.com,DIRECT',
  'DOMAIN-SUFFIX,portal101.cn,DIRECT',
  'DOMAIN-SUFFIX,ephone.ai,DIRECT',
  'DOMAIN-SUFFIX,pcbeta.com,DIRECT',
  'DOMAIN-SUFFIX,shimoxi.qzz.io,DIRECT',
  'DOMAIN-SUFFIX,jihulab.com,DIRECT',
  'DOMAIN-SUFFIX,edgeone.ai,DIRECT',
  'DOMAIN-SUFFIX,yun.139.com,DIRECT',
  'DOMAIN-SUFFIX,edgeone.run,DIRECT',
  'DOMAIN-SUFFIX,tencentcloud,DIRECT',
  'DOMAIN-SUFFIX,archlinuxcn.org,DIRECT',

  // 服务规则
  "RULE-SET,Apple,Apple",
  "RULE-SET,Telegram,Telegram",
  "RULE-SET,YouTube,YouTube",
  "RULE-SET,BiliBili,BiliBili",
  "RULE-SET,TikTok,TikTok",
  "RULE-SET,Spotify,Spotify",
  "RULE-SET,Netflix,Netflix",
  "RULE-SET,Disney,Disney",
  "RULE-SET,Google,Google",
  "RULE-SET,OpenAI,OpenAI",
  "RULE-SET,Microsoft,Microsoft",
  "RULE-SET,Twitter,Twitter",
  "RULE-SET,Steam,Steam",
  "RULE-SET,OneDrive,OneDrive",
  "RULE-SET,Emby,Emby",
  "RULE-SET,Gemini,Gemini",
  "RULE-SET,Claude,Claude",
  "RULE-SET,Github,Github",

  // 默认规则（必须在最后）
  "MATCH,Proxy"
];