├── .gitignore
├── .layouts
    ├── 404.html
    ├── canvas.html
    ├── docs.html
    ├── head.html
    └── nav.html
├── 404.md
├── CNAME
├── Gemfile
├── Gemfile.lock
├── LICENSE
├── _config.yml
├── assets
    ├── apple-touch-icon.png
    ├── canvas.js
    ├── card.png
    ├── icon.svg
    ├── prism.js
    └── style.css
├── docs
    └── apps.md
├── favicon.ico
├── logo.svg
├── readme.md
├── sample.canvas
└── spec
    └── 1.0.md


/.gitignore:
--------------------------------------------------------------------------------
1 | _site
2 | .sass-cache
3 | .jekyll-cache
4 | .jekyll-metadata
5 | .obsidian
6 | vendor
7 | .DS_Store


--------------------------------------------------------------------------------
/.layouts/404.html:
--------------------------------------------------------------------------------
/.layouts/canvas.html:
--------------------------------------------------------------------------------
/.layouts/docs.html:
--------------------------------------------------------------------------------
 1 | <!DOCTYPE html>
 2 | <html lang="en">
 3 | {% include head.html %}
 4 |   <body>
 5 | 
 6 |     {% include nav.html %}
 7 | 
 8 |     <div class="page">
 9 |         {{ content }}
10 |     </div>
11 | 
12 |     <script>
13 |       document.addEventListener("DOMContentLoaded", function() {
14 |           const urlParams = new URLSearchParams(window.location.search);
15 |           const hideNav = urlParams.get('hidenav');
16 |           if(hideNav === 'true') {
17 |               document.body.classList.add('hidenav');
18 |           }
19 |       });
20 |       document.addEventListener('DOMContentLoaded', function() {
21 |         const links = document.querySelectorAll('a');
22 |         links.forEach(link => {
23 |           const url = new URL(link.href);
24 |           if (url.hostname !== window.location.hostname) {
25 |             link.target = '_blank';
26 |             link.rel = 'noopener noreferrer';
27 |           }
28 |         });
29 |       });
30 |     </script>
31 |   </body>
32 | </html>
33 | 


--------------------------------------------------------------------------------
/.layouts/head.html:
--------------------------------------------------------------------------------
 1 |   <head>
 2 |     <meta charset="UTF-8">
 3 |     <title>{{ site.title }} — {{ page.title }}</title>
 4 | 
 5 |     <meta name="viewport"            content="width=device-width, initial-scale=1.0">
 6 |     <meta name="description"         content="{% if page.content -%}{{ page.content | markdownify | strip_html | strip_newlines | truncate: 160 }}{% else -%}{{ site.description }}{% endif -%}">
 7 |     <meta name="author"              content="{{ site.name }}">
 8 | 
 9 |     <link rel="canonical"            href="{{ site.url }}{{ page.url }}">
10 |     <link rel="icon"                 href="{{ site.url }}/favicon.ico" sizes="32x32">
11 |     <link rel="icon"                 href="{{ site.url }}/assets/icon.svg"    type="image/svg+xml">
12 |     <link rel="apple-touch-icon"     href="{{ site.url }}/assets/apple-touch-icon.png">
13 |     <link rel="stylesheet"           href="{{ site.url }}/assets/style.css"  type="text/css">
14 | 
15 |     <meta property="og:site_name"    content="{{ site.title }}">
16 |     <meta property="og:url"          content="{{ site.url }}{{ page.url }}">
17 |     <meta property="og:title"        content="{{ site.title }}">
18 |     <meta property="og:description"  content="{% if page.content -%}{{ page.content | markdownify | strip_html | strip_newlines | truncate: 160 }}{% else -%}{{ site.description }}{% endif -%}">
19 |     <meta property="og:type"         content="{% if page.title -%}article{% else -%}website{% endif -%}">
20 |     <meta property="og:image"        content="{{ site.url }}/assets/card.png">
21 | 
22 |     <meta name="twitter:card"        content="summary_large_image">
23 |     <meta name="twitter:image"       content="{{ site.url }}/assets/card.png">
24 |     <meta name="twitter:title"       content="{{ site.title }}">
25 |     <meta name="twitter:description" content="{% if page.content -%}{{ page.content | markdownify | strip_html | strip_newlines | truncate: 160 }}{% else -%}{{ site.description }}{% endif -%}">
26 |   </head>


--------------------------------------------------------------------------------
/.layouts/nav.html:
--------------------------------------------------------------------------------
 1 | <div id="navbar">
 2 |       <nav>
 3 |         <a href="/" id="logo"><img width="120" height="44" src="/logo.svg" alt="JSON Feed" /></a>
 4 |         <a href="/docs/apps" class="link">Apps</a>
 5 |         <a href="/spec/1.0" class="link">Spec</a>
 6 |         <a href="https://github.com/obsidianmd/jsoncanvas" class="link">GitHub</a>
 7 |       </nav>
 8 | 
 9 |       <hr>
10 |     </div>


--------------------------------------------------------------------------------
/404.md:
--------------------------------------------------------------------------------
 1 | ---
 2 | title: Not found
 3 | permalink: /404.html
 4 | layout: 404
 5 | ---
 6 | 
 7 | <div class="container">
 8 |   <svg width="96" height="96" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
 9 |   <path d="M-4.36441e-06 102.115C-1.95401e-06 88.3294 11.1757 77.1537 24.9615 77.1538V77.1538C38.7474 77.1538 49.9231 88.3294 49.9231 102.115V102.115C49.9231 115.901 38.7474 127.077 24.9615 127.077V127.077C11.1757 127.077 -6.77481e-06 115.901 -4.36441e-06 102.115V102.115Z" fill="var(--color-ax-1)"/>
10 |   <path d="M77.1538 24.9615C77.1538 11.1757 88.3295 1.95401e-06 102.115 4.36441e-06V4.36441e-06C115.901 6.77481e-06 127.077 11.1757 127.077 24.9615V24.9615C127.077 38.7474 115.901 49.9231 102.115 49.9231V49.9231C88.3295 49.9231 77.1538 38.7474 77.1538 24.9615V24.9615Z" fill="var(--color-ax-1)"/>
11 |   <path fill-rule="evenodd" clip-rule="evenodd" d="M63.5386 104.102C63.5385 81.6995 81.699 63.539 104.101 63.539H113.462V82.2601H104.101C92.0384 82.2601 82.2597 92.0389 82.2597 104.102L82.2598 113.462L63.5386 113.462L63.5386 104.102Z" fill="var(--color-ax-1)"/>
12 |   </svg>
13 | 
14 |   <h1>404</h1>
15 | 
16 |   <p>Whoops. You've found an unknown part of this infinite canvas. <a href="/">Head back home</a>.</p>
17 | </div>
18 | 


--------------------------------------------------------------------------------
/CNAME:
--------------------------------------------------------------------------------
1 | jsoncanvas.org


--------------------------------------------------------------------------------
/Gemfile:
--------------------------------------------------------------------------------
 1 | source "https://rubygems.org"
 2 | 
 3 | gem "github-pages", group: :jekyll_plugins
 4 | # If you have any plugins, put them here!
 5 | group :jekyll_plugins do
 6 |   gem "jekyll-feed", "~> 0.12"
 7 | end
 8 | 
 9 | gem "webrick", "~> 1.8"
10 | 


--------------------------------------------------------------------------------
/Gemfile.lock:
--------------------------------------------------------------------------------
  1 | GEM
  2 |   remote: https://rubygems.org/
  3 |   specs:
  4 |     activesupport (7.1.3.2)
  5 |       base64
  6 |       bigdecimal
  7 |       concurrent-ruby (~> 1.0, >= 1.0.2)
  8 |       connection_pool (>= 2.2.5)
  9 |       drb
 10 |       i18n (>= 1.6, < 2)
 11 |       minitest (>= 5.1)
 12 |       mutex_m
 13 |       tzinfo (~> 2.0)
 14 |     addressable (2.8.6)
 15 |       public_suffix (>= 2.0.2, < 6.0)
 16 |     base64 (0.2.0)
 17 |     bigdecimal (3.1.6)
 18 |     coffee-script (2.4.1)
 19 |       coffee-script-source
 20 |       execjs
 21 |     coffee-script-source (1.12.2)
 22 |     colorator (1.1.0)
 23 |     commonmarker (0.23.10)
 24 |     concurrent-ruby (1.2.3)
 25 |     connection_pool (2.4.1)
 26 |     dnsruby (1.70.0)
 27 |       simpleidn (~> 0.2.1)
 28 |     drb (2.2.0)
 29 |       ruby2_keywords
 30 |     em-websocket (0.5.3)
 31 |       eventmachine (>= 0.12.9)
 32 |       http_parser.rb (~> 0)
 33 |     ethon (0.16.0)
 34 |       ffi (>= 1.15.0)
 35 |     eventmachine (1.2.7)
 36 |     execjs (2.9.1)
 37 |     faraday (2.9.0)
 38 |       faraday-net_http (>= 2.0, < 3.2)
 39 |     faraday-net_http (3.1.0)
 40 |       net-http
 41 |     ffi (1.16.3)
 42 |     forwardable-extended (2.6.0)
 43 |     gemoji (4.1.0)
 44 |     github-pages (231)
 45 |       github-pages-health-check (= 1.18.2)
 46 |       jekyll (= 3.9.5)
 47 |       jekyll-avatar (= 0.8.0)
 48 |       jekyll-coffeescript (= 1.2.2)
 49 |       jekyll-commonmark-ghpages (= 0.4.0)
 50 |       jekyll-default-layout (= 0.1.5)
 51 |       jekyll-feed (= 0.17.0)
 52 |       jekyll-gist (= 1.5.0)
 53 |       jekyll-github-metadata (= 2.16.1)
 54 |       jekyll-include-cache (= 0.2.1)
 55 |       jekyll-mentions (= 1.6.0)
 56 |       jekyll-optional-front-matter (= 0.3.2)
 57 |       jekyll-paginate (= 1.1.0)
 58 |       jekyll-readme-index (= 0.3.0)
 59 |       jekyll-redirect-from (= 0.16.0)
 60 |       jekyll-relative-links (= 0.6.1)
 61 |       jekyll-remote-theme (= 0.4.3)
 62 |       jekyll-sass-converter (= 1.5.2)
 63 |       jekyll-seo-tag (= 2.8.0)
 64 |       jekyll-sitemap (= 1.4.0)
 65 |       jekyll-swiss (= 1.0.0)
 66 |       jekyll-theme-architect (= 0.2.0)
 67 |       jekyll-theme-cayman (= 0.2.0)
 68 |       jekyll-theme-dinky (= 0.2.0)
 69 |       jekyll-theme-hacker (= 0.2.0)
 70 |       jekyll-theme-leap-day (= 0.2.0)
 71 |       jekyll-theme-merlot (= 0.2.0)
 72 |       jekyll-theme-midnight (= 0.2.0)
 73 |       jekyll-theme-minimal (= 0.2.0)
 74 |       jekyll-theme-modernist (= 0.2.0)
 75 |       jekyll-theme-primer (= 0.6.0)
 76 |       jekyll-theme-slate (= 0.2.0)
 77 |       jekyll-theme-tactile (= 0.2.0)
 78 |       jekyll-theme-time-machine (= 0.2.0)
 79 |       jekyll-titles-from-headings (= 0.5.3)
 80 |       jemoji (= 0.13.0)
 81 |       kramdown (= 2.4.0)
 82 |       kramdown-parser-gfm (= 1.1.0)
 83 |       liquid (= 4.0.4)
 84 |       mercenary (~> 0.3)
 85 |       minima (= 2.5.1)
 86 |       nokogiri (>= 1.13.6, < 2.0)
 87 |       rouge (= 3.30.0)
 88 |       terminal-table (~> 1.4)
 89 |     github-pages-health-check (1.18.2)
 90 |       addressable (~> 2.3)
 91 |       dnsruby (~> 1.60)
 92 |       octokit (>= 4, < 8)
 93 |       public_suffix (>= 3.0, < 6.0)
 94 |       typhoeus (~> 1.3)
 95 |     html-pipeline (2.14.3)
 96 |       activesupport (>= 2)
 97 |       nokogiri (>= 1.4)
 98 |     http_parser.rb (0.8.0)
 99 |     i18n (1.14.1)
100 |       concurrent-ruby (~> 1.0)
101 |     jekyll (3.9.5)
102 |       addressable (~> 2.4)
103 |       colorator (~> 1.0)
104 |       em-websocket (~> 0.5)
105 |       i18n (>= 0.7, < 2)
106 |       jekyll-sass-converter (~> 1.0)
107 |       jekyll-watch (~> 2.0)
108 |       kramdown (>= 1.17, < 3)
109 |       liquid (~> 4.0)
110 |       mercenary (~> 0.3.3)
111 |       pathutil (~> 0.9)
112 |       rouge (>= 1.7, < 4)
113 |       safe_yaml (~> 1.0)
114 |     jekyll-avatar (0.8.0)
115 |       jekyll (>= 3.0, < 5.0)
116 |     jekyll-coffeescript (1.2.2)
117 |       coffee-script (~> 2.2)
118 |       coffee-script-source (~> 1.12)
119 |     jekyll-commonmark (1.4.0)
120 |       commonmarker (~> 0.22)
121 |     jekyll-commonmark-ghpages (0.4.0)
122 |       commonmarker (~> 0.23.7)
123 |       jekyll (~> 3.9.0)
124 |       jekyll-commonmark (~> 1.4.0)
125 |       rouge (>= 2.0, < 5.0)
126 |     jekyll-default-layout (0.1.5)
127 |       jekyll (>= 3.0, < 5.0)
128 |     jekyll-feed (0.17.0)
129 |       jekyll (>= 3.7, < 5.0)
130 |     jekyll-gist (1.5.0)
131 |       octokit (~> 4.2)
132 |     jekyll-github-metadata (2.16.1)
133 |       jekyll (>= 3.4, < 5.0)
134 |       octokit (>= 4, < 7, != 4.4.0)
135 |     jekyll-include-cache (0.2.1)
136 |       jekyll (>= 3.7, < 5.0)
137 |     jekyll-mentions (1.6.0)
138 |       html-pipeline (~> 2.3)
139 |       jekyll (>= 3.7, < 5.0)
140 |     jekyll-optional-front-matter (0.3.2)
141 |       jekyll (>= 3.0, < 5.0)
142 |     jekyll-paginate (1.1.0)
143 |     jekyll-readme-index (0.3.0)
144 |       jekyll (>= 3.0, < 5.0)
145 |     jekyll-redirect-from (0.16.0)
146 |       jekyll (>= 3.3, < 5.0)
147 |     jekyll-relative-links (0.6.1)
148 |       jekyll (>= 3.3, < 5.0)
149 |     jekyll-remote-theme (0.4.3)
150 |       addressable (~> 2.0)
151 |       jekyll (>= 3.5, < 5.0)
152 |       jekyll-sass-converter (>= 1.0, <= 3.0.0, != 2.0.0)
153 |       rubyzip (>= 1.3.0, < 3.0)
154 |     jekyll-sass-converter (1.5.2)
155 |       sass (~> 3.4)
156 |     jekyll-seo-tag (2.8.0)
157 |       jekyll (>= 3.8, < 5.0)
158 |     jekyll-sitemap (1.4.0)
159 |       jekyll (>= 3.7, < 5.0)
160 |     jekyll-swiss (1.0.0)
161 |     jekyll-theme-architect (0.2.0)
162 |       jekyll (> 3.5, < 5.0)
163 |       jekyll-seo-tag (~> 2.0)
164 |     jekyll-theme-cayman (0.2.0)
165 |       jekyll (> 3.5, < 5.0)
166 |       jekyll-seo-tag (~> 2.0)
167 |     jekyll-theme-dinky (0.2.0)
168 |       jekyll (> 3.5, < 5.0)
169 |       jekyll-seo-tag (~> 2.0)
170 |     jekyll-theme-hacker (0.2.0)
171 |       jekyll (> 3.5, < 5.0)
172 |       jekyll-seo-tag (~> 2.0)
173 |     jekyll-theme-leap-day (0.2.0)
174 |       jekyll (> 3.5, < 5.0)
175 |       jekyll-seo-tag (~> 2.0)
176 |     jekyll-theme-merlot (0.2.0)
177 |       jekyll (> 3.5, < 5.0)
178 |       jekyll-seo-tag (~> 2.0)
179 |     jekyll-theme-midnight (0.2.0)
180 |       jekyll (> 3.5, < 5.0)
181 |       jekyll-seo-tag (~> 2.0)
182 |     jekyll-theme-minimal (0.2.0)
183 |       jekyll (> 3.5, < 5.0)
184 |       jekyll-seo-tag (~> 2.0)
185 |     jekyll-theme-modernist (0.2.0)
186 |       jekyll (> 3.5, < 5.0)
187 |       jekyll-seo-tag (~> 2.0)
188 |     jekyll-theme-primer (0.6.0)
189 |       jekyll (> 3.5, < 5.0)
190 |       jekyll-github-metadata (~> 2.9)
191 |       jekyll-seo-tag (~> 2.0)
192 |     jekyll-theme-slate (0.2.0)
193 |       jekyll (> 3.5, < 5.0)
194 |       jekyll-seo-tag (~> 2.0)
195 |     jekyll-theme-tactile (0.2.0)
196 |       jekyll (> 3.5, < 5.0)
197 |       jekyll-seo-tag (~> 2.0)
198 |     jekyll-theme-time-machine (0.2.0)
199 |       jekyll (> 3.5, < 5.0)
200 |       jekyll-seo-tag (~> 2.0)
201 |     jekyll-titles-from-headings (0.5.3)
202 |       jekyll (>= 3.3, < 5.0)
203 |     jekyll-watch (2.2.1)
204 |       listen (~> 3.0)
205 |     jemoji (0.13.0)
206 |       gemoji (>= 3, < 5)
207 |       html-pipeline (~> 2.2)
208 |       jekyll (>= 3.0, < 5.0)
209 |     kramdown (2.4.0)
210 |       rexml
211 |     kramdown-parser-gfm (1.1.0)
212 |       kramdown (~> 2.0)
213 |     liquid (4.0.4)
214 |     listen (3.8.0)
215 |       rb-fsevent (~> 0.10, >= 0.10.3)
216 |       rb-inotify (~> 0.9, >= 0.9.10)
217 |     mercenary (0.3.6)
218 |     mini_portile2 (2.8.5)
219 |     minima (2.5.1)
220 |       jekyll (>= 3.5, < 5.0)
221 |       jekyll-feed (~> 0.9)
222 |       jekyll-seo-tag (~> 2.1)
223 |     minitest (5.22.2)
224 |     mutex_m (0.2.0)
225 |     net-http (0.4.1)
226 |       uri
227 |     nokogiri (1.16.2)
228 |       mini_portile2 (~> 2.8.2)
229 |       racc (~> 1.4)
230 |     nokogiri (1.16.2-aarch64-linux)
231 |       racc (~> 1.4)
232 |     nokogiri (1.16.2-arm-linux)
233 |       racc (~> 1.4)
234 |     nokogiri (1.16.2-arm64-darwin)
235 |       racc (~> 1.4)
236 |     nokogiri (1.16.2-x86-linux)
237 |       racc (~> 1.4)
238 |     nokogiri (1.16.2-x86_64-darwin)
239 |       racc (~> 1.4)
240 |     nokogiri (1.16.2-x86_64-linux)
241 |       racc (~> 1.4)
242 |     octokit (4.25.1)
243 |       faraday (>= 1, < 3)
244 |       sawyer (~> 0.9)
245 |     pathutil (0.16.2)
246 |       forwardable-extended (~> 2.6)
247 |     public_suffix (5.0.4)
248 |     racc (1.7.3)
249 |     rb-fsevent (0.11.2)
250 |     rb-inotify (0.10.1)
251 |       ffi (~> 1.0)
252 |     rexml (3.2.6)
253 |     rouge (3.30.0)
254 |     ruby2_keywords (0.0.5)
255 |     rubyzip (2.3.2)
256 |     safe_yaml (1.0.5)
257 |     sass (3.7.4)
258 |       sass-listen (~> 4.0.0)
259 |     sass-listen (4.0.0)
260 |       rb-fsevent (~> 0.9, >= 0.9.4)
261 |       rb-inotify (~> 0.9, >= 0.9.7)
262 |     sawyer (0.9.2)
263 |       addressable (>= 2.3.5)
264 |       faraday (>= 0.17.3, < 3)
265 |     simpleidn (0.2.1)
266 |       unf (~> 0.1.4)
267 |     terminal-table (1.8.0)
268 |       unicode-display_width (~> 1.1, >= 1.1.1)
269 |     typhoeus (1.4.1)
270 |       ethon (>= 0.9.0)
271 |     tzinfo (2.0.6)
272 |       concurrent-ruby (~> 1.0)
273 |     unf (0.1.4)
274 |       unf_ext
275 |     unf_ext (0.0.9.1)
276 |     unicode-display_width (1.8.0)
277 |     uri (0.13.0)
278 |     webrick (1.8.1)
279 | 
280 | PLATFORMS
281 |   aarch64-linux
282 |   aarch64-linux-android
283 |   aarch64-linux-musl
284 |   arm-linux
285 |   arm-linux-androideabi
286 |   arm-linux-musleabihf
287 |   arm64-darwin
288 |   x86-linux
289 |   x86-linux-android
290 |   x86-linux-musl
291 |   x86_64-darwin
292 |   x86_64-linux
293 |   x86_64-linux-android
294 |   x86_64-linux-musl
295 | 
296 | DEPENDENCIES
297 |   github-pages
298 |   jekyll-feed (~> 0.12)
299 |   webrick (~> 1.8)
300 | 
301 | BUNDLED WITH
302 |    2.5.6
303 | 


--------------------------------------------------------------------------------
/LICENSE:
--------------------------------------------------------------------------------
 1 | MIT License
 2 | 
 3 | Copyright (c) 2024 Obsidian.md
 4 | 
 5 | Permission is hereby granted, free of charge, to any person obtaining a copy
 6 | of this software and associated documentation files (the "Software"), to deal
 7 | in the Software without restriction, including without limitation the rights
 8 | to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 9 | copies of the Software, and to permit persons to whom the Software is
10 | furnished to do so, subject to the following conditions:
11 | 
12 | The above copyright notice and this permission notice shall be included in all
13 | copies or substantial portions of the Software.
14 | 
15 | THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
16 | IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
17 | FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
18 | AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
19 | LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
20 | OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
21 | SOFTWARE.
22 | 


--------------------------------------------------------------------------------
/_config.yml:
--------------------------------------------------------------------------------
 1 | name:                'JSON Canvas'
 2 | title:               'JSON Canvas'
 3 | url:                 'https://jsoncanvas.org'
 4 | description:         'An open file format for infinite canvas data.'
 5 | exclude:             ['.obsidian']
 6 | 
 7 | github:              [metadata]
 8 | 
 9 | baseurl:             ''
10 | 
11 | layouts_dir:         .layouts
12 | includes_dir:        .layouts
13 | 
14 | use_html_extension:  false
15 | 
16 | permalink:           pretty
17 | relative_permalinks: false
18 | 
19 | defaults:
20 |   - scope:
21 |       path: "**/*"
22 |     values:
23 |       layout: "canvas"
24 |   - scope:
25 |       path: "spec/**/*.md"
26 |     values:
27 |       layout: "docs"
28 |   - scope:
29 |       path: "docs/**/*.md"
30 |     values:
31 |       layout: "docs"


--------------------------------------------------------------------------------
https://raw.githubusercontent.com/obsidianmd/jsoncanvas/62965a81a1ad1a8e190be66925b3c8270ccff71f/assets/apple-touch-icon.png


--------------------------------------------------------------------------------
/assets/canvas.js:
--------------------------------------------------------------------------------
  1 | // Initial state of the canvas
  2 | let scale, panOffsetX, panOffsetY;
  3 | 
  4 | const ZOOM_SPEED = 0.1;
  5 | const minScale = 0.35;
  6 | const maxScale = 1.25;
  7 | const container = document.getElementById('canvas-nodes');
  8 | 
  9 | let isDragging = false;
 10 | let isSpacePressed = false;
 11 | let isPanning = false;
 12 | 
 13 | let startX = 0;
 14 | let startY = 0;
 15 | let lastTouchX = 0;
 16 | let lastTouchY = 0;
 17 | let touchStartPanX = 0;
 18 | let touchStartPanY = 0;
 19 | 
 20 | function adjustCanvasToViewport() {
 21 |   const nodes = document.querySelectorAll('.node');
 22 |   let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
 23 | 
 24 |   nodes.forEach(node => {
 25 |     const x = parseInt(node.style.left, 10);
 26 |     const y = parseInt(node.style.top, 10);
 27 |     const width = node.offsetWidth;
 28 |     const height = node.offsetHeight;
 29 | 
 30 |     minX = Math.min(minX, x);
 31 |     maxX = Math.max(maxX, x + width);
 32 |     minY = Math.min(minY, y);
 33 |     maxY = Math.max(maxY, y + height);
 34 |   });
 35 | 
 36 |   const boundingBoxWidth = maxX - minX;
 37 |   const boundingBoxHeight = maxY - minY;
 38 |   const viewportWidth = window.innerWidth;
 39 |   const viewportHeight = window.innerHeight;
 40 | 
 41 |   const scaleX = viewportWidth / (boundingBoxWidth + 80);
 42 |   const scaleY = viewportHeight / (boundingBoxHeight + 80);
 43 |   scale = Math.min(scaleX, scaleY, 1); // Ensure the scale is not more than 1
 44 | 
 45 |   panOffsetX = (viewportWidth - boundingBoxWidth * scale) / 2 - minX * scale;
 46 |   panOffsetY = (viewportHeight - boundingBoxHeight * scale) / 2 - minY * scale;
 47 | 
 48 |   // Apply the calculated scale and pan offsets
 49 |   applyPanAndZoom();
 50 | 
 51 |   document.getElementById('canvas-nodes').style.opacity = 1;
 52 |   document.getElementById('canvas-edges').style.opacity = 1;
 53 | }
 54 | 
 55 | document.addEventListener('DOMContentLoaded', adjustCanvasToViewport);
 56 | 
 57 | // Zoom
 58 | window.addEventListener('wheel', (e) => {
 59 |     if (e.ctrlKey || e.metaKey) {
 60 |         if (e.deltaY > 0) {
 61 |             scale = Math.max(scale - ZOOM_SPEED, minScale);
 62 |         } else {
 63 |             scale = Math.min(scale + ZOOM_SPEED, maxScale);
 64 |         }
 65 | 
 66 |         document.body.style.setProperty('--scale', scale);
 67 |         e.preventDefault();
 68 |     }
 69 | }, {passive: false});
 70 | 
 71 | // Buttons
 72 | document.getElementById('zoom-in').addEventListener('click', function() {
 73 |     scale = Math.min(scale + ZOOM_SPEED, maxScale);
 74 |     document.body.style.setProperty('--scale', scale);
 75 | });
 76 | 
 77 | document.getElementById('zoom-out').addEventListener('click', function() {
 78 |     scale = Math.max(scale - ZOOM_SPEED, minScale);
 79 |     document.body.style.setProperty('--scale', scale);
 80 | });
 81 | 
 82 | document.getElementById('zoom-reset').addEventListener('click', function() {
 83 |   adjustCanvasToViewport();
 84 | });
 85 | 
 86 | document.getElementById('toggle-output').addEventListener('click', function() {
 87 |   const output = document.getElementById('output');
 88 |   output.classList.toggle('hidden');
 89 | });
 90 | 
 91 | document.querySelector('.close-output').addEventListener('click', function() {
 92 |   const output = document.getElementById('output');
 93 |   output.classList.toggle('hidden');
 94 | });
 95 | 
 96 | document.querySelector('.button-copy').addEventListener('click', function() {
 97 |   const positionsOutput = document.getElementById('positionsOutput').textContent;
 98 |   navigator.clipboard.writeText(positionsOutput).catch(err => {
 99 |     console.error('Error copying canvas data: ', err);
100 |   });
101 | });
102 | 
103 | document.querySelector('.button-download').addEventListener('click', function() {
104 |   const positionsOutput = document.getElementById('positionsOutput').textContent;
105 |   const blob = new Blob([positionsOutput], { type: 'text/plain' });
106 |   const url = URL.createObjectURL(blob);
107 |   const a = document.createElement('a');
108 |   a.href = url;
109 |   a.download = 'sample.canvas';
110 |   document.body.appendChild(a);
111 |   a.click();
112 |   document.body.removeChild(a);
113 |   URL.revokeObjectURL(url);
114 | });
115 | 
116 | // Very simplified Markdown conversion
117 | function htmlToMarkdown(html) {
118 |   let markdown = html.replace(/<br\s*[\/]?>/gi, "\n");
119 |   markdown = markdown.replace(/<a href="([^"]+)">([^<]+)<\/a>/gi, "[$2]($1)");
120 |   markdown = markdown.replace(/<ul>/gi, "\n\n").replace(/<\/ul>/gi, "\n\n").replace(/<li>/gi, "- ").replace(/<\/li>/gi, "\n");
121 |   markdown = markdown.replace(/<[^>]+>/g, '');
122 |   markdown = markdown.replace(/\n\s*-\s+/g, "\n- ");
123 |   markdown = markdown.trim().replace(/\n{3,}/g, "\n\n");
124 |   return markdown;
125 | }
126 | 
127 | document.addEventListener('DOMContentLoaded', function() {
128 |   const links = document.querySelectorAll('a');
129 |   links.forEach(link => {
130 |     const url = new URL(link.href);
131 |     if (url.hostname !== window.location.hostname) {
132 |       link.target = '_blank';
133 |       link.rel = 'noopener noreferrer';
134 |     }
135 |   });
136 | });
137 | 
138 | function prepareForSerialization() {
139 |   document.querySelectorAll('a').forEach(link => {
140 |       if (link.hasAttribute('target') && link.target === '_blank') {
141 |           link.removeAttribute('target');
142 |           link.removeAttribute('rel');
143 |       }
144 |   });
145 | }
146 | 
147 | // Serialize canvas data
148 | function updateCanvasData() {
149 |   prepareForSerialization();
150 |   const nodes = Array.from(document.querySelectorAll('.node')).map(node => {
151 |       const nodeObject = {
152 |           id: node.id,
153 |           type: node.getAttribute('data-node-type'),
154 |           x: parseInt(node.style.left, 10),
155 |           y: parseInt(node.style.top, 10),
156 |           width: node.offsetWidth,
157 |           height: node.offsetHeight,
158 |       };
159 | 
160 |       const fileAttribute = node.getAttribute('data-node-file');
161 |       if (fileAttribute) {
162 |           nodeObject.file = fileAttribute;
163 |       }
164 | 
165 |       if (nodeObject.type === 'text') {
166 |           const textContent = node.querySelector('.node-text-content').innerHTML;
167 |           nodeObject.text = htmlToMarkdown(textContent);
168 |       }
169 | 
170 | 
171 |       return nodeObject;
172 |   });
173 | 
174 |   const canvasData = {
175 |     nodes: nodes,
176 |     edges: edges,
177 |   };
178 | 
179 |   const positionsOutput = document.getElementById('positionsOutput');
180 |   positionsOutput.textContent = JSON.stringify(canvasData, null, 2);
181 | 
182 |   Prism.highlightElement(positionsOutput);
183 | }
184 | 
185 | function getAnchorPoint(node, side) {
186 |   const x = parseInt(node.style.left, 10);
187 |   const y = parseInt(node.style.top, 10);
188 |   const width = node.offsetWidth;
189 |   const height = node.offsetHeight;
190 | 
191 |   switch (side) {
192 |     case 'top':
193 |       return { x: x + width / 2, y: y };
194 |     case 'right':
195 |       return { x: x + width, y: y + height / 2 };
196 |     case 'bottom':
197 |       return { x: x + width / 2, y: y + height };
198 |     case 'left':
199 |       return { x: x, y: y + height / 2 };
200 |     default: // center or unspecified case
201 |       return { x: x + width / 2, y: y + height / 2 };
202 |   }
203 | }
204 | 
205 | function drawEdges() {
206 |   const svgContainer = document.getElementById('edge-paths');
207 |   svgContainer.innerHTML = ''; // Clear existing edges for redraw
208 | 
209 |   edges.forEach(edge => {
210 |     const fromNode = document.getElementById(edge.fromNode);
211 |     const toNode = document.getElementById(edge.toNode);
212 | 
213 |     if (fromNode && toNode) {
214 |       const fromPoint = getAnchorPoint(fromNode, edge.fromSide);
215 |       const toPoint = getAnchorPoint(toNode, edge.toSide);
216 | 
217 |       const curveTightness = 0.75;
218 |       const controlPointX1 = fromPoint.x + (toPoint.x - fromPoint.x) * curveTightness;
219 |       const controlPointX2 = fromPoint.x + (toPoint.x - fromPoint.x) * (1 - curveTightness);
220 |       const controlPointY1 = fromPoint.y;
221 |       const controlPointY2 = toPoint.y;
222 | 
223 |       const d = `M ${fromPoint.x} ${fromPoint.y} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${toPoint.x} ${toPoint.y}`;
224 | 
225 |       const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
226 |       path.setAttribute('d', d);
227 |       path.setAttribute('stroke', 'black');
228 |       path.setAttribute('fill', 'none');
229 |       if (edge.toEnd === 'arrow') {
230 |         path.setAttribute('marker-end', 'url(#arrowhead)');
231 |       }
232 | 
233 |       svgContainer.appendChild(path);
234 |     }
235 |   });
236 | }
237 | 
238 | // Drag nodes
239 | document.querySelectorAll('.node .node-name').forEach(nodeName => {
240 |   nodeName.addEventListener('mousedown', function(e) {
241 |     if (isSpacePressed) return;
242 |     
243 |     isDragging = true;
244 |     startX = e.clientX;
245 |     startY = e.clientY;
246 |     selectedElement = this.parentElement;
247 |     selectedElement.classList.add('is-dragging');
248 |   });
249 | });
250 | 
251 | window.addEventListener('mousemove', function(e) {
252 |   if (!isDragging || !selectedElement) return;
253 |   
254 |   const dx = (e.clientX - startX) / scale;
255 |   const dy = (e.clientY - startY) / scale;
256 | 
257 |   selectedElement.style.left = `${parseInt(selectedElement.style.left, 10) + dx}px`;
258 |   selectedElement.style.top = `${parseInt(selectedElement.style.top, 10) + dy}px`;
259 | 
260 |   startX = e.clientX;
261 |   startY = e.clientY;
262 | 
263 |   drawEdges();
264 | });
265 | 
266 | window.addEventListener('mouseup', function() {
267 |   if (isDragging && selectedElement) {
268 |     selectedElement.classList.remove('is-dragging');
269 |     isDragging = false;
270 |     selectedElement = null;
271 |     updateCanvasData();
272 |     drawEdges();
273 |   }
274 | });
275 | 
276 | // Panning
277 | window.addEventListener('keydown', function(e) {
278 |   if (e.code === 'Space') {
279 |     e.preventDefault();
280 |     isSpacePressed = true;
281 |     document.body.classList.add('will-pan');
282 |   }
283 | });
284 | 
285 | window.addEventListener('keyup', function(e) {
286 |   if (e.code === 'Space') {
287 |     isSpacePressed = false;
288 |     document.body.classList.remove('will-pan');
289 |   }
290 | });
291 | 
292 | window.addEventListener('mousedown', function(e) {
293 |   if (isSpacePressed && !isDragging) {
294 |     isPanning = true;
295 |     document.body.style.cursor = 'grabbing';
296 |     panStartX = e.clientX - panOffsetX;
297 |     panStartY = e.clientY - panOffsetY;
298 |   }
299 | });
300 | 
301 | window.addEventListener('mousemove', function(e) {
302 |   if (isPanning) {
303 |     panOffsetX = e.clientX - panStartX;
304 |     panOffsetY = e.clientY - panStartY;
305 | 
306 |     document.body.style.setProperty('--pan-x', `${panOffsetX}px`);
307 |     document.body.style.setProperty('--pan-y', `${panOffsetY}px`);
308 |   }
309 | });
310 | 
311 | window.addEventListener('mouseup', function() {
312 |   if (isPanning) {
313 |     isPanning = false;
314 |     document.body.style.cursor = '';
315 |   }
316 | });
317 | 
318 | // Touch-based devices 
319 | let initialDistance = null;
320 | 
321 | document.addEventListener('gesturestart', function(e){ e.preventDefault(); });
322 | 
323 | document.getElementById('canvas-container').addEventListener('touchstart', function(e) {
324 |   if (e.touches.length === 1) { // Single touch for panning
325 |     isPanning = true;
326 |     const touch = e.touches[0];
327 |     touchStartPanX = touch.pageX - panOffsetX;
328 |     touchStartPanY = touch.pageY - panOffsetY;
329 |     lastTouchX = touch.pageX;
330 |     lastTouchY = touch.pageY;
331 |   } else if (e.touches.length === 2) { // Two-finger touch for zooming
332 |     e.preventDefault(); // Prevent page zoom
333 |     const touch1 = e.touches[0];
334 |     const touch2 = e.touches[1];
335 |     initialDistance = Math.sqrt((touch2.pageX - touch1.pageX) ** 2 + (touch2.pageY - touch1.pageY) ** 2);
336 |   }
337 | }, { passive: false });
338 | 
339 | // Touch move for panning and zooming
340 | document.getElementById('canvas-container').addEventListener('touchmove', function(e) {
341 |   if (e.touches.length === 1 && isPanning) {
342 |     const touch = e.touches[0];
343 |     const dx = touch.pageX - lastTouchX;
344 |     const dy = touch.pageY - lastTouchY;
345 |     panOffsetX += dx;
346 |     panOffsetY += dy;
347 |     lastTouchX = touch.pageX;
348 |     lastTouchY = touch.pageY;
349 |     applyPanAndZoom();
350 |     drawEdges();
351 |   } else if (e.touches.length === 2) { // Adjust for zooming
352 |     e.preventDefault();
353 |     const touch1 = e.touches[0];
354 |     const touch2 = e.touches[1];
355 |     const distance = Math.sqrt((touch2.pageX - touch1.pageX) ** 2 + (touch2.pageY - touch1.pageY) ** 2);
356 |     const scaleChange = distance / initialDistance;
357 |     scale = Math.min(Math.max(minScale, scale * scaleChange), maxScale); // Apply and limit scale
358 |     document.body.style.setProperty('--scale', scale);
359 |     initialDistance = distance;
360 |     applyPanAndZoom();
361 |   }
362 | }, { passive: false });
363 | 
364 | document.getElementById('canvas-container').addEventListener('touchend', function(e) {
365 |   if (isPanning) {
366 |     isPanning = false;
367 |   }
368 |   if (e.touches.length < 2) {
369 |     initialDistance = null; // Reset zoom tracking on lifting one finger
370 |   }
371 | });
372 | 
373 | // Activate node on touch
374 | document.querySelectorAll('.node .node-name').forEach(nodeName => {
375 |   nodeName.addEventListener('touchstart', function(e) {
376 |     // Prevent activating multiple nodes simultaneously
377 |     deactivateAllNodes();
378 |     const node = this.parentElement;
379 |     node.classList.add('is-active');
380 |     // Prepare for potential drag
381 |     isDragging = false;
382 |     const touch = e.touches[0];
383 |     startX = touch.pageX;
384 |     startY = touch.pageY;
385 |     selectedElement = node;
386 |     e.stopPropagation();
387 |   }, {passive: true});
388 | });
389 | 
390 | // Deactivate nodes when tapping outside
391 | document.addEventListener('touchstart', function(e) {
392 |   if (!e.target.closest('.node')) {
393 |     deactivateAllNodes();
394 |   }
395 | });
396 | 
397 | function deactivateAllNodes() {
398 |   document.querySelectorAll('.node').forEach(node => {
399 |     node.classList.remove('is-active');
400 |   });
401 | }
402 | 
403 | // Handling dragging for an activated node
404 | document.addEventListener('touchmove', function(e) {
405 |   if (isDragging && selectedElement && selectedElement.classList.contains('is-active')) {
406 |     const touch = e.touches[0];
407 |     const dx = (touch.pageX - startX) / scale;
408 |     const dy = (touch.pageY - startY) / scale;
409 |     selectedElement.style.left = `${parseInt(selectedElement.style.left, 10) + dx}px`;
410 |     selectedElement.style.top = `${parseInt(selectedElement.style.top, 10) + dy}px`;
411 | 
412 |     // Update startX and startY for the next move event
413 |     startX = touch.pageX;
414 |     startY = touch.pageY;
415 | 
416 |     // Call drawEdges to update edge positions based on the new node positions
417 |     drawEdges();
418 | 
419 |     e.preventDefault(); // Prevent default to avoid scrolling and other touch actions
420 |   }
421 | }, { passive: false });
422 | 
423 | // Determine if dragging should start
424 | document.addEventListener('touchmove', function(e) {
425 |   if (selectedElement && !isDragging) {
426 |     const touch = e.touches[0];
427 |     if (Math.abs(touch.pageX - startX) > 10 || Math.abs(touch.pageY - startY) > 10) {
428 |       isDragging = true; // Start dragging if moved beyond threshold
429 |     }
430 |   }
431 | }, {passive: true});
432 | 
433 | // End dragging
434 | document.addEventListener('touchend', function() {
435 |   if (isDragging && selectedElement) {
436 |     selectedElement.classList.remove('is-dragging');
437 |     isDragging = false;
438 |     selectedElement = null;
439 |   }
440 | });
441 | 
442 | function applyPanAndZoom() {
443 |   document.body.style.setProperty('--scale', scale);
444 |   document.body.style.setProperty('--pan-x', `${panOffsetX}px`);
445 |   document.body.style.setProperty('--pan-y', `${panOffsetY}px`);
446 | }
447 | 
448 | // Prevent the whole page from zooming on pinch
449 | document.addEventListener('gesturestart', function(e) {
450 |   e.preventDefault();
451 | });
452 | 
453 | document.addEventListener('gesturechange', function(e) {
454 |   e.preventDefault();
455 | });
456 | 
457 | drawEdges();
458 | updateCanvasData();


--------------------------------------------------------------------------------
https://raw.githubusercontent.com/obsidianmd/jsoncanvas/62965a81a1ad1a8e190be66925b3c8270ccff71f/assets/card.png


--------------------------------------------------------------------------------
 1 | <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
 2 | <g clip-path="url(#clip0_33_23)">
 3 | <rect width="1024" height="1024" fill="#8B0A5F"/>
 4 | <path d="M157.538 748.306C157.538 668.55 222.192 603.896 301.948 603.896C381.703 603.896 446.358 668.55 446.358 748.306C446.358 828.062 381.703 892.716 301.948 892.716C222.192 892.716 157.538 828.062 157.538 748.306Z" fill="white"/>
 5 | <path d="M603.9 301.948C603.9 222.192 668.555 157.537 748.31 157.538C828.066 157.538 892.72 222.192 892.72 301.948C892.72 381.703 828.066 446.358 748.31 446.358C668.555 446.358 603.9 381.703 603.9 301.948Z" fill="white"/>
 6 | <path fill-rule="evenodd" clip-rule="evenodd" d="M813.95 579.283C813.95 708.886 708.886 813.95 579.283 813.95L525.129 813.95L525.129 705.642L579.283 705.642C649.069 705.642 705.642 649.069 705.642 579.283L705.642 525.13L813.95 525.13L813.95 579.283Z" fill="white"/>
 7 | </g>
 8 | <defs>
 9 | <clipPath id="clip0_33_23">
10 | <rect width="1024" height="1024" rx="196" fill="white"/>
11 | </clipPath>
12 | </defs>
13 | </svg>
14 | 


--------------------------------------------------------------------------------
/assets/prism.js:
--------------------------------------------------------------------------------
1 | /* PrismJS 1.29.0
2 | https://prismjs.com/download.html#themes=prism&languages=clike+javascript+json */
3 | var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(e){var n=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,t=0,r={},a={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof i?new i(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function e(n,t){var r,i;switch(t=t||{},a.util.type(n)){case"Object":if(i=a.util.objId(n),t[i])return t[i];for(var l in r={},t[i]=r,n)n.hasOwnProperty(l)&&(r[l]=e(n[l],t));return r;case"Array":return i=a.util.objId(n),t[i]?t[i]:(r=[],t[i]=r,n.forEach((function(n,a){r[a]=e(n,t)})),r);default:return n}},getLanguage:function(e){for(;e;){var t=n.exec(e.className);if(t)return t[1].toLowerCase();e=e.parentElement}return"none"},setLanguage:function(e,t){e.className=e.className.replace(RegExp(n,"gi"),""),e.classList.add("language-"+t)},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(r){var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack)||[])[1];if(e){var n=document.getElementsByTagName("script");for(var t in n)if(n[t].src==e)return n[t]}return null}},isActive:function(e,n,t){for(var r="no-"+n;e;){var a=e.classList;if(a.contains(n))return!0;if(a.contains(r))return!1;e=e.parentElement}return!!t}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(e,n){var t=a.util.clone(a.languages[e]);for(var r in n)t[r]=n[r];return t},insertBefore:function(e,n,t,r){var i=(r=r||a.languages)[e],l={};for(var o in i)if(i.hasOwnProperty(o)){if(o==n)for(var s in t)t.hasOwnProperty(s)&&(l[s]=t[s]);t.hasOwnProperty(o)||(l[o]=i[o])}var u=r[e];return r[e]=l,a.languages.DFS(a.languages,(function(n,t){t===u&&n!=e&&(this[n]=l)})),l},DFS:function e(n,t,r,i){i=i||{};var l=a.util.objId;for(var o in n)if(n.hasOwnProperty(o)){t.call(n,o,n[o],r||o);var s=n[o],u=a.util.type(s);"Object"!==u||i[l(s)]?"Array"!==u||i[l(s)]||(i[l(s)]=!0,e(s,t,o,i)):(i[l(s)]=!0,e(s,t,null,i))}}},plugins:{},highlightAll:function(e,n){a.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var r={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),a.hooks.run("before-all-elements-highlight",r);for(var i,l=0;i=r.elements[l++];)a.highlightElement(i,!0===n,r.callback)},highlightElement:function(n,t,r){var i=a.util.getLanguage(n),l=a.languages[i];a.util.setLanguage(n,i);var o=n.parentElement;o&&"pre"===o.nodeName.toLowerCase()&&a.util.setLanguage(o,i);var s={element:n,language:i,grammar:l,code:n.textContent};function u(e){s.highlightedCode=e,a.hooks.run("before-insert",s),s.element.innerHTML=s.highlightedCode,a.hooks.run("after-highlight",s),a.hooks.run("complete",s),r&&r.call(s.element)}if(a.hooks.run("before-sanity-check",s),(o=s.element.parentElement)&&"pre"===o.nodeName.toLowerCase()&&!o.hasAttribute("tabindex")&&o.setAttribute("tabindex","0"),!s.code)return a.hooks.run("complete",s),void(r&&r.call(s.element));if(a.hooks.run("before-highlight",s),s.grammar)if(t&&e.Worker){var c=new Worker(a.filename);c.onmessage=function(e){u(e.data)},c.postMessage(JSON.stringify({language:s.language,code:s.code,immediateClose:!0}))}else u(a.highlight(s.code,s.grammar,s.language));else u(a.util.encode(s.code))},highlight:function(e,n,t){var r={code:e,grammar:n,language:t};if(a.hooks.run("before-tokenize",r),!r.grammar)throw new Error('The language "'+r.language+'" has no grammar.');return r.tokens=a.tokenize(r.code,r.grammar),a.hooks.run("after-tokenize",r),i.stringify(a.util.encode(r.tokens),r.language)},tokenize:function(e,n){var t=n.rest;if(t){for(var r in t)n[r]=t[r];delete n.rest}var a=new s;return u(a,a.head,e),o(e,a,n,a.head,0),function(e){for(var n=[],t=e.head.next;t!==e.tail;)n.push(t.value),t=t.next;return n}(a)},hooks:{all:{},add:function(e,n){var t=a.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=a.hooks.all[e];if(t&&t.length)for(var r,i=0;r=t[i++];)r(n)}},Token:i};function i(e,n,t,r){this.type=e,this.content=n,this.alias=t,this.length=0|(r||"").length}function l(e,n,t,r){e.lastIndex=n;var a=e.exec(t);if(a&&r&&a[1]){var i=a[1].length;a.index+=i,a[0]=a[0].slice(i)}return a}function o(e,n,t,r,s,g){for(var f in t)if(t.hasOwnProperty(f)&&t[f]){var h=t[f];h=Array.isArray(h)?h:[h];for(var d=0;d<h.length;++d){if(g&&g.cause==f+","+d)return;var v=h[d],p=v.inside,m=!!v.lookbehind,y=!!v.greedy,k=v.alias;if(y&&!v.pattern.global){var x=v.pattern.toString().match(/[imsuy]*$/)[0];v.pattern=RegExp(v.pattern.source,x+"g")}for(var b=v.pattern||v,w=r.next,A=s;w!==n.tail&&!(g&&A>=g.reach);A+=w.value.length,w=w.next){var E=w.value;if(n.length>e.length)return;if(!(E instanceof i)){var P,L=1;if(y){if(!(P=l(b,A,e,m))||P.index>=e.length)break;var S=P.index,O=P.index+P[0].length,j=A;for(j+=w.value.length;S>=j;)j+=(w=w.next).value.length;if(A=j-=w.value.length,w.value instanceof i)continue;for(var C=w;C!==n.tail&&(j<O||"string"==typeof C.value);C=C.next)L++,j+=C.value.length;L--,E=e.slice(A,j),P.index-=A}else if(!(P=l(b,0,E,m)))continue;S=P.index;var N=P[0],_=E.slice(0,S),M=E.slice(S+N.length),W=A+E.length;g&&W>g.reach&&(g.reach=W);var z=w.prev;if(_&&(z=u(n,z,_),A+=_.length),c(n,z,L),w=u(n,z,new i(f,p?a.tokenize(N,p):N,k,N)),M&&u(n,w,M),L>1){var I={cause:f+","+d,reach:W};o(e,n,t,w.prev,A,I),g&&I.reach>g.reach&&(g.reach=I.reach)}}}}}}function s(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0}function u(e,n,t){var r=n.next,a={value:t,prev:n,next:r};return n.next=a,r.prev=a,e.length++,a}function c(e,n,t){for(var r=n.next,a=0;a<t&&r!==e.tail;a++)r=r.next;n.next=r,r.prev=n,e.length-=a}if(e.Prism=a,i.stringify=function e(n,t){if("string"==typeof n)return n;if(Array.isArray(n)){var r="";return n.forEach((function(n){r+=e(n,t)})),r}var i={type:n.type,content:e(n.content,t),tag:"span",classes:["token",n.type],attributes:{},language:t},l=n.alias;l&&(Array.isArray(l)?Array.prototype.push.apply(i.classes,l):i.classes.push(l)),a.hooks.run("wrap",i);var o="";for(var s in i.attributes)o+=" "+s+'="'+(i.attributes[s]||"").replace(/"/g,"&quot;")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+o+">"+i.content+"</"+i.tag+">"},!e.document)return e.addEventListener?(a.disableWorkerMessageHandler||e.addEventListener("message",(function(n){var t=JSON.parse(n.data),r=t.language,i=t.code,l=t.immediateClose;e.postMessage(a.highlight(i,a.languages[r],r)),l&&e.close()}),!1),a):a;var g=a.util.currentScript();function f(){a.manual||a.highlightAll()}if(g&&(a.filename=g.src,g.hasAttribute("data-manual")&&(a.manual=!0)),!a.manual){var h=document.readyState;"loading"===h||"interactive"===h&&g&&g.defer?document.addEventListener("DOMContentLoaded",f):window.requestAnimationFrame?window.requestAnimationFrame(f):window.setTimeout(f,16)}return a}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
4 | Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};
5 | Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)","javascript")),Prism.languages.js=Prism.languages.javascript;
6 | Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}},Prism.languages.webmanifest=Prism.languages.json;
7 | 


--------------------------------------------------------------------------------
/assets/style.css:
--------------------------------------------------------------------------------
  1 | :root {
  2 |   --font-content: -apple-system, BlinkMacSystemFont, "Inter", "IBM Plex Sans", Segoe UI, Helvetica, Arial, sans-serif;
  3 |   --font-mono: ui-monospace, SFMono-Regular, "Cascadia Code", "Roboto Mono", "Source Code Pro", "DejaVu Sans Mono", "Liberation Mono", "Consolas", Menlo, Monaco, monospace;
  4 |   --font-small: 0.875em;
  5 |   --font-smaller: 0.8em;
  6 |   --wrap-wide: 1000px;
  7 |   --wrap-normal: 37em;
  8 |   --line-height: 1.5;
  9 | 
 10 |   --color-bg-1: #fff;
 11 |   --color-bg-2: #fafafa;
 12 |   --color-tx-1: #3F062D;
 13 |   --color-tx-2: #999;
 14 |   --color-ui-1: #ddd;
 15 |   --color-ui-2: #bbb;
 16 |   --color-ui-3: #5E0641;
 17 |   --color-ax-1: #8B0A5F;
 18 | 
 19 |   --color-selection: rgba(139,10,95,0.15);
 20 | }
 21 | 
 22 | .theme-dark {
 23 |   --color-bg-1: #1e0516;
 24 |   --color-bg-2: #140310;
 25 |   --color-tx-1: #fff;
 26 |   --color-tx-2: #a28397;
 27 |   --color-ui-1: #3F062D;
 28 |   --color-ui-2: #68154C;
 29 |   --color-ui-3: #b40e7a;
 30 |   --color-ax-1: #8B0A5F;
 31 | 
 32 |   --color-selection: rgba(139,10,95,0.5);
 33 | }
 34 | 
 35 | *, *:before, *:after {
 36 |   box-sizing:inherit;}
 37 | 
 38 | ::selection {
 39 |   background: var(--color-selection);
 40 | }
 41 | 
 42 | ::-moz-selection {
 43 |   background: var(--color-selection);
 44 | }
 45 | 
 46 | html, body {
 47 |   touch-action: manipulation;
 48 | }
 49 | 
 50 | html {
 51 |   box-sizing: border-box;
 52 |   width: 100%;
 53 |   height: 100%;
 54 |   font-size: 62.5%;
 55 | }
 56 | 
 57 | body {
 58 |   color-scheme: light dark;
 59 |   -webkit-font-smoothing: antialiased;
 60 |   text-rendering: optimizeLegibility;
 61 |   background-color: var(--color-bg-1);
 62 |   font-family: var(--font-content);
 63 |   margin: 0 auto 0 auto;
 64 |   line-height: var(--line-height);
 65 |   padding: 0;
 66 |   font-size: 1.6rem;
 67 |   color: var(--color-tx-1);
 68 | }
 69 | 
 70 | /* Canvas area */
 71 | #home {
 72 |   overflow: hidden;
 73 | }
 74 | #container {
 75 |   touch-action: none;
 76 |   display: flex;
 77 |   flex: 1;
 78 |   flex-direction: row;
 79 |   height: 100%;
 80 |   width: 100%;
 81 |   position: fixed;
 82 |   top: 0;
 83 |   left: 0;
 84 | }
 85 | #canvas-container {
 86 |   width: 100%;
 87 |   height: 100%;
 88 |   padding: 0;
 89 |   position: relative;
 90 |   background-color: var(--color-bg-2);
 91 |   background-image: radial-gradient(var(--color-ui-1) calc(var(--scale)*0.5px + 0.5px), transparent 0);
 92 |   background-size: calc(var(--scale) * 20px) calc(var(--scale) * 20px);
 93 |   overflow: hidden;
 94 |   background-position: calc(var(--pan-x) - 19px) calc(var(--pan-y) - 19px);
 95 | }
 96 | #canvas-edges,
 97 | #canvas-nodes {
 98 |   opacity: 0;
 99 |   transform: translate(var(--pan-x), var(--pan-y)) scale(var(--scale));
100 |   transform-origin: left top;
101 | }
102 | #canvas-edges {
103 |   z-index: 150;
104 |   pointer-events: none;
105 |   user-select: none;
106 |   overflow:visible;
107 |   position: absolute;
108 |   top: 0;
109 |   left: 0;
110 |   width: 100%;
111 |   height: 100%;
112 | }
113 | #canvas-edges path {
114 |   stroke: var(--color-ui-3);
115 |   stroke-width: 2;
116 |   fill: none;
117 | }
118 | #arrowhead {
119 |   fill: var(--color-ui-3);
120 | }
121 | .will-pan {
122 |   cursor: grab;
123 | }
124 | 
125 | /* Canvas output pane */
126 | #output.hidden {
127 |   transform: translateX(120%);
128 | }
129 | #output {
130 |   position: fixed;
131 |   height: 92vh;
132 |   top: 1rem;
133 |   right: 1rem;
134 |   bottom: auto;
135 |   border-radius: 12px;
136 |   color: var(--color-tx-1);
137 |   background-color: var(--color-bg-1);
138 |   border: 1px solid var(--color-ui-1);
139 |   box-shadow: 0 5px 15px rgba(0,0,0,0.2);;
140 |   z-index: 0;
141 |   width: 24em;
142 |   max-width: 40%;
143 |   display: flex;
144 |   flex-direction: column;
145 |   transition: transform 200ms;
146 | }
147 | #output p {
148 |   font-size: 90%;
149 |   line-height: 1.3;
150 |   padding-right: 0.5em;
151 | }
152 | #output-code {
153 |   color-scheme: dark;
154 |   flex-grow: 1;
155 |   width: 100%;
156 |   overflow: auto;
157 |   -webkit-overflow-scrolling: touch;
158 |   padding: 1rem;
159 |   border-top: 1px solid var(--color-ui-1);
160 |   border-bottom: 1px solid var(--color-ui-1);
161 | }
162 | #output pre {
163 |   color-scheme: dark;
164 |   width: 100%;
165 |   padding: 0.5em;
166 |   margin: 0;
167 | }
168 | .code-footer,
169 | .code-header {
170 |   font-size: 80%;
171 |   font-weight: 500;
172 |   padding: 0;
173 |   display: flex;
174 |   align-items: center;
175 |   color: var(--color-tx-2);
176 |   gap: 8px;
177 |   padding: 1rem;
178 | }
179 | .code-footer {
180 |   justify-content: center;
181 | }
182 | .code-header .language {
183 |   flex-grow: 1;
184 | }
185 | .close-output {
186 |   font-weight: 300;
187 |   cursor: pointer;
188 |   user-select: none;
189 |   -ms-user-select: none;
190 |   -webkit-user-select: none;
191 |   font-size: 24px;
192 |   line-height: 0;
193 |   display: flex;
194 |   align-items: center;
195 |   margin-top: -4px;
196 | }
197 | .close-output:hover {
198 |   color: var(--color-tx-1);
199 | }
200 | 
201 | /* Pages */
202 | .page {
203 |   padding: 36px 36px 48px;
204 |   max-width: 48em;
205 |   margin: 0 auto;
206 | }
207 | nav {
208 |   padding: 24px 36px;
209 |   max-width: 48em;
210 |   margin: 0 auto;
211 |   display: flex;
212 |   align-items: center;
213 |   gap: 4px;
214 | }
215 | nav #logo {
216 |   flex-grow: 1;
217 | }
218 | nav .link {
219 |   color: var(--color-ax-1);
220 |   text-decoration: none;
221 |   padding: 0.25em 0.5em;
222 |   border-radius: 6px;
223 | }
224 | nav .link:hover {
225 |   color: var(--color-bg-1);
226 |   background-color: var(--color-ax-1);
227 | }
228 | .hidenav #navbar {
229 |  display: none;
230 | }
231 | 
232 | /* Specific nodes */
233 | #logo {
234 |   border-radius: 8px;
235 |   line-height: 0;
236 |   z-index: 100;
237 |   padding: 4px 12px 4px 4px;
238 | }
239 | #logo .node-name {
240 |   top: -1.25em;
241 |   padding-left: 4px;
242 | }
243 | #nav {
244 |   z-index: 90;
245 |   white-space: nowrap;
246 |   padding-right: 48px;
247 | }
248 | #readme {
249 |   width: 480px;
250 |   padding: 36px;
251 |   z-index: 80;
252 | }
253 | #spec {
254 |   width: 480px;
255 |   height: 480px;
256 |   z-index: 70;
257 | }
258 | 
259 | 
260 | /* General node styling */
261 | .node {
262 |   -webkit-tap-highlight-color: rgba(0,0,0,0);
263 |   position: absolute;
264 |   display: block;
265 | }
266 | .node.is-active {
267 |   box-shadow:
268 |     0 0 0 2px var(--color-ui-3);
269 | }
270 | .node.is-dragging {
271 |   cursor: grabbing;
272 |   box-shadow:
273 |     0 0 0 2px var(--color-ui-3),
274 |     0 5px 15px rgba(0,0,0,0.2);
275 | }
276 | .node.is-dragging iframe {
277 |   pointer-events: none;
278 | }
279 | .node:hover .node-name {
280 |   opacity: 1;
281 |   color: var(--color-tx-1);
282 |   border-radius: 8px 8px 0 0;
283 | }
284 | .node-name {
285 |   -webkit-tap-highlight-color: rgba(0,0,0,0);
286 |   cursor: grab;
287 |   opacity: 1;
288 |   position: absolute;
289 |   height: 2.25em;
290 |   padding: 0.25em 0.5em;
291 |   width: 100%;
292 |   top: -2.25em;
293 |   left: 0;
294 |   color: var(--color-ui-2);
295 |   font-size: calc(var(--font-smaller) * 1/var(--scale));
296 |   -ms-user-select: none;
297 |   -webkit-user-select: none;
298 |   user-select: none;
299 | }
300 | .node.is-dragging .node-name {
301 |   cursor: grabbing;
302 | }
303 | .node-link,
304 | .node-text {
305 |   background-color: var(--color-bg-1);
306 |   border-radius: 8px;
307 |   box-shadow: 0 0 0 2px var(--color-ui-1);
308 | }
309 | .node-file img {
310 |   -webkit-user-drag: none;
311 |   -moz-user-drag: none;
312 |   -o-user-drag: none;
313 |   user-drag: none;
314 | }
315 | .node-text-content {
316 |   padding: 12px 24px;
317 | }
318 | 
319 | /* Canvas controls */
320 | #controls {
321 |   position: fixed;
322 |   bottom: 1rem;
323 |   right: 1rem;
324 |   z-index: 100;
325 |   display: flex;
326 |   align-items: center;
327 |   gap: 6px;
328 |   -ms-user-select: none;
329 |   -webkit-user-select: none;
330 |   user-select: none;
331 | }
332 | 
333 | /* Page content */
334 | h1 {
335 |   line-height: 1.1;
336 |   margin-top: 0.25em;
337 | }
338 | h2 {
339 |   line-height: 1.2;
340 |   margin-bottom: 0em;
341 |   margin-top: 1.5em;
342 | }
343 | h2 + p {
344 |   margin-top: 0.5em;
345 | }
346 | 
347 | ul + h2,
348 | ul + h3,
349 | p + h2,
350 | p + h3 {
351 |   margin-top: 1.5em;
352 | }
353 | 
354 | h2 + h3 {
355 |   margin-top: 0.75em;
356 | }
357 | 
358 | a {
359 |   font-weight: 600;
360 |   color: var(--color-tx-1);
361 |   text-decoration: underline;
362 | }
363 | small {
364 |   color: var(--color-tx-2);
365 | }
366 | small a {
367 |   font-weight: 400;
368 |   color: var(--color-tx-2);
369 | }
370 | hr {
371 |   margin: 0;
372 |   border: 0;
373 |   height: 1px;
374 |   background-color: var(--color-ui-1);
375 | }
376 | iframe {
377 |   -webkit-appearance: none;
378 |   border: none;
379 |   outline: none;
380 |   margin: 0;
381 |   vertical-align: bottom;
382 |   border-radius: 8px;
383 | }
384 | img {
385 |   vertical-align: bottom;
386 | }
387 | code {
388 |   -webkit-appearance: none;
389 |   font-family: var(--font-mono);
390 |   cursor: text;
391 | }
392 | pre {
393 |   -webkit-appearance: none;
394 |   font-family: var(--font-mono);
395 |   background-color: transparent;
396 |   border-radius: 4px;
397 |   padding: 0;
398 |   font-size: 85%;
399 |   cursor: text;
400 | }
401 | pre:active,
402 | pre:focus {
403 |   outline: none;
404 |   border: none;
405 | }
406 | pre code {
407 |   color: var(--color-tx-2);
408 |   background-color: transparent;
409 |   border: none;
410 |   padding: 0;
411 |   font-size: inherit;
412 | }
413 | code {
414 |   font-family: var(--font-mono);
415 |   background-color: var(--color-bg-2);
416 |   border: 1px solid var(--color-ui-1);
417 |   border-radius: 4px;
418 |   padding: 0 0.2em;
419 |   font-size: 85%;
420 | }
421 | ul {
422 |   padding-inline-start: 2em;
423 | }
424 | li::marker {
425 |   color: var(--color-tx-2);
426 | }
427 | 
428 | table {
429 |   margin-top: 1.5em;
430 |   margin-bottom: 2.5em;
431 |   border-collapse:collapse;
432 |   border-spacing:0;
433 | }
434 | tr {
435 |   border-bottom: 1px solid var(--color-ui-1);
436 | }
437 | td {
438 |   padding: 0.5em 1em 0.5em 0;
439 |   line-height: 1.3;
440 | }
441 | th:not(:last-child) {
442 |   padding-right: 1em;
443 | }
444 | td:last-child {
445 |   padding-right: 0;
446 | }
447 | th {
448 |   text-align: left;
449 |   font-weight: 600;
450 |   padding: 0 1em 0.5em 0;
451 | }
452 | 
453 | button {
454 |   -webkit-tap-highlight-color: rgba(0,0,0,0);
455 |   -ms-user-select: none;
456 |   -webkit-user-select: none;
457 |   user-select: none;
458 |   cursor: pointer;
459 |   font-family: var(--font-content);
460 |   background: var(--color-bg-1);
461 |   outline: none;
462 |   border: 1px solid var(--color-ui-1);
463 |   padding: 4px 8px;
464 |   color: var(--color-tx-1);
465 |   border-radius: 4px;
466 |   font-weight: 500;
467 | }
468 | button:hover {
469 |   border-color: var(--color-ui-2);
470 | }
471 | .theme-dark button {
472 |   background-color: var(--color-ui-1);
473 |   color: var(--color-tx-2);
474 |   border: 1px solid var(--color-ui-2);
475 | }
476 | .theme-dark button:hover {
477 |   color: var(--color-tx-1);
478 |   border: 1px solid var(--color-ui-3);
479 | }
480 | 
481 | @media (max-width: 800px) {
482 |   body:not(.hidenav) nav {
483 |     padding: 24px;
484 |     gap: 0;
485 |   }
486 |   body:not(.hidenav) .page {
487 |     padding: 24px 24px 48px 24px;
488 |   }
489 |   #controls {
490 |     bottom: 0;
491 |     right: 0;
492 |     left: 0;
493 |     padding: 1rem;
494 |     border-top: 1px solid var(--color-ui-1);
495 |     width: 100%;
496 |     background-color: var(--color-bg-1);
497 |     justify-content: center;
498 |     height: 48px;
499 |   }
500 |   #output {
501 |     border-radius: 0;
502 |     border: none;
503 |     left: 0;
504 |     top: 0;
505 |     z-index: 200;
506 |     width: 100vw;
507 |     height: calc(100% - 48px);
508 |     transition: none;
509 |     max-width: 100vw;
510 |     box-shadow: none;
511 |   }
512 |   #output-code {
513 |     padding: 1rem 1rem 6rem;
514 |   }
515 |   .code-footer {
516 | 
517 |   }
518 | }
519 | 
520 | /* PrismJS 1.29.0
521 | https://prismjs.com/download.html#themes=prism&languages=json */
522 | /**
523 |  * prism.js default theme for JavaScript, CSS and HTML
524 |  * Based on dabblet (http://dabblet.com)
525 |  * @author Lea Verou
526 |  */
527 | 
528 | code[class*="language-"],
529 | pre[class*="language-"] {
530 |   text-align: left;
531 |   white-space: pre-wrap;
532 |   word-spacing: normal;
533 |   word-break: normal;
534 |   word-wrap: normal;
535 | 
536 |   -moz-tab-size: 4;
537 |   -o-tab-size: 4;
538 |   tab-size: 4;
539 | 
540 |   -webkit-hyphens: none;
541 |   -moz-hyphens: none;
542 |   -ms-hyphens: none;
543 |   hyphens: none;
544 | }
545 | 
546 | /* Code blocks */
547 | pre[class*="language-"] {
548 |   overflow: auto;
549 |   overflow-x: hidden;
550 | }
551 | 
552 | /* Inline code */
553 | :not(pre) > code[class*="language-"] {
554 |   white-space: normal;
555 | }
556 | 
557 | .token.comment,
558 | .token.prolog,
559 | .token.doctype,
560 | .token.cdata {
561 |   color: slategray;
562 | }
563 | 
564 | .token.punctuation {
565 |   color: var(--color-tx-2);
566 | }
567 | 
568 | .token.namespace {
569 |   opacity: .7;
570 | }
571 | 
572 | .token.property,
573 | .token.tag,
574 | .token.boolean,
575 | .token.constant,
576 | .token.symbol,
577 | .token.deleted {
578 |   color: #f8aa59;
579 | }
580 | 
581 | .token.number {
582 |   color: #ee529d;
583 | }
584 | 
585 | .token.selector,
586 | .token.attr-name,
587 | .token.string,
588 | .token.char,
589 | .token.builtin,
590 | .token.inserted {
591 |   color: #fe7568;
592 | }
593 | 
594 | .token.operator,
595 | .token.entity,
596 | .token.url,
597 | .language-css .token.string,
598 | .style .token.string {
599 |   color: var(--color-tx-2);
600 | }
601 | 
602 | .token.atrule,
603 | .token.attr-value,
604 | .token.keyword {
605 |   color: #07a;
606 | }
607 | 
608 | .token.function,
609 | .token.class-name {
610 |   color: #DD4A68;
611 | }
612 | 
613 | .token.regex,
614 | .token.important,
615 | .token.variable {
616 |   color: #e90;
617 | }
618 | 
619 | .token.important,
620 | .token.bold {
621 |   font-weight: bold;
622 | }
623 | .token.italic {
624 |   font-style: italic;
625 | }
626 | 
627 | .token.entity {
628 |   cursor: help;
629 | }
630 | 
631 | 
632 | 


--------------------------------------------------------------------------------
/docs/apps.md:
--------------------------------------------------------------------------------
 1 | # Apps and tools
 2 | 
 3 | JSON Canvas is supported by the following apps and tools. If you would like to add an app or tool to this list, please submit a pull request on [GitHub](https://github.com/obsidianmd/jsoncanvas).
 4 | 
 5 | ## Apps
 6 | 
 7 | | Name                                            | Storage | Import | Export |
 8 | | ----------------------------------------------- | :-----: | :----: | :----: |
 9 | | [Obsidian](https://obsidian.md/)                |    ✓    |   ✓    |   ✓    |
10 | | [Kinopio](https://kinopio.club/)                |         |   ✓    |   ✓    |
11 | | [Flowchart Fun](https://flowchart.fun/)         |         |   ✓    |   ✓    |
12 | | [hi-canvas](https://hi-canvas.marknoteapp.com/) |         |   ✓    |   ✓    |
13 | | [OrgPad](https://orgpad.info/)                  |         |   ✓    |   ✓    |
14 | 
15 | ## Tools
16 | 
17 | To convert from other formats to JSON Canvas:
18 | 
19 | - [Heptabase to JSON Canvas](https://github.com/link-ding/Heptabase-Export)
20 | 
21 | To convert from JSON Canvas to other formats:
22 | 
23 | - [Mermaid](https://alexwiench.github.io/json-canvas-to-mermaid-demo/)
24 | - [Property Graph Exchange Format](https://www.npmjs.org/package/pgraphs)
25 | 
26 | ## Libraries
27 | 
28 | - [C single-header library](https://github.com/ossldossl/jsonCanvas)
29 | - [Dart library](https://pub.dev/packages/json_canvas/)
30 | - [Go library](https://github.com/supersonicpineapple/go-jsoncanvas)
31 | - [Python library](https://pypi.org/project/PyJSONCanvas/)
32 | - [React library](https://github.com/Digital-Tvilling/react-jsoncanvas)
33 | - [Ruby library](https://github.com/ongaeshi/json_canvas)
34 | - [Rust crate](https://crates.io/crates/jsoncanvas)
35 | - [TypeScript library](https://npmjs.com/package/@trbn/jsoncanvas)
36 | - [Rehype Rendering Library (inline)](https://github.com/lovettbarron/rehype-jsoncanvas)
37 | - [Vue library](https://github.com/wujieli0207/vue-json-canvas)
38 | 


--------------------------------------------------------------------------------
https://raw.githubusercontent.com/obsidianmd/jsoncanvas/62965a81a1ad1a8e190be66925b3c8270ccff71f/favicon.ico


--------------------------------------------------------------------------------
 1 | <svg width="163" height="60" viewBox="0 0 163 60" fill="none" xmlns="http://www.w3.org/2000/svg">
 2 | <path d="M161.814 42.1702H157.484C157.461 41.9032 157.368 41.6731 157.203 41.4799C157.038 41.2867 156.825 41.139 156.564 41.0367C156.308 40.9287 156.024 40.8748 155.711 40.8748C155.308 40.8748 154.961 40.9486 154.672 41.0964C154.382 41.2441 154.24 41.4543 154.246 41.727C154.24 41.9202 154.322 42.0992 154.493 42.264C154.669 42.4287 155.007 42.5566 155.507 42.6475L158.166 43.1248C159.507 43.3691 160.504 43.781 161.158 44.3606C161.817 44.9344 162.149 45.7043 162.155 46.6702C162.149 47.602 161.871 48.4117 161.319 49.0992C160.774 49.781 160.027 50.3094 159.078 50.6844C158.135 51.0537 157.058 51.2384 155.848 51.2384C153.848 51.2384 152.283 50.8293 151.152 50.0111C150.027 49.193 149.399 48.1134 149.268 46.7725H153.939C154.001 47.1873 154.206 47.5083 154.552 47.7356C154.905 47.9572 155.348 48.0679 155.882 48.0679C156.314 48.0679 156.669 47.9941 156.947 47.8464C157.231 47.6986 157.376 47.4884 157.382 47.2157C157.376 46.9657 157.251 46.7668 157.007 46.6191C156.768 46.4714 156.393 46.352 155.882 46.2611L153.564 45.852C152.229 45.6191 151.229 45.1759 150.564 44.5225C149.899 43.8691 149.569 43.0282 149.575 41.9998C149.569 41.0907 149.808 40.3208 150.291 39.6901C150.78 39.0537 151.476 38.5708 152.379 38.2412C153.288 37.906 154.365 37.7384 155.609 37.7384C157.501 37.7384 158.993 38.1304 160.084 38.9145C161.18 39.6986 161.757 40.7839 161.814 42.1702Z" fill="#8B0A5F"/>
 3 | <path d="M139.796 51.2043C138.961 51.2043 138.222 51.068 137.58 50.7952C136.944 50.5168 136.444 50.0964 136.08 49.5339C135.716 48.9714 135.535 48.2554 135.535 47.3861C135.535 46.6702 135.657 46.0594 135.901 45.5537C136.145 45.0424 136.486 44.6248 136.924 44.3009C137.361 43.977 137.87 43.7299 138.449 43.5594C139.035 43.389 139.665 43.2782 140.341 43.227C141.074 43.1702 141.663 43.102 142.106 43.0225C142.555 42.9373 142.878 42.8208 143.077 42.6731C143.276 42.5197 143.376 42.3179 143.376 42.0679V42.0339C143.376 41.693 143.245 41.4316 142.984 41.2498C142.722 41.0679 142.387 40.977 141.978 40.977C141.529 40.977 141.163 41.0765 140.878 41.2753C140.6 41.4685 140.432 41.7668 140.376 42.1702H136.046C136.103 41.3748 136.356 40.6418 136.805 39.9714C137.259 39.2952 137.921 38.7554 138.79 38.352C139.66 37.9429 140.745 37.7384 142.046 37.7384C142.984 37.7384 143.824 37.8492 144.569 38.0708C145.313 38.2867 145.947 38.5907 146.469 38.9827C146.992 39.3691 147.39 39.8236 147.663 40.3464C147.941 40.8634 148.08 41.4259 148.08 42.0339V50.9998H143.682V49.1589H143.58C143.319 49.6475 143.001 50.0424 142.626 50.3435C142.256 50.6447 141.833 50.8634 141.356 50.9998C140.884 51.1361 140.364 51.2043 139.796 51.2043ZM141.33 48.2384C141.688 48.2384 142.023 48.1645 142.336 48.0168C142.654 47.8691 142.913 47.656 143.111 47.3776C143.31 47.0992 143.41 46.7611 143.41 46.3634V45.2725C143.285 45.3236 143.151 45.3719 143.009 45.4174C142.873 45.4628 142.725 45.5055 142.566 45.5452C142.413 45.585 142.248 45.6219 142.072 45.656C141.901 45.6901 141.722 45.7214 141.535 45.7498C141.171 45.8066 140.873 45.9003 140.64 46.031C140.413 46.156 140.242 46.3123 140.128 46.4998C140.02 46.6816 139.966 46.8861 139.966 47.1134C139.966 47.477 140.094 47.7554 140.35 47.9486C140.606 48.1418 140.932 48.2384 141.33 48.2384Z" fill="#8B0A5F"/>
 4 | <path d="M135.618 37.9089L131.221 50.9998H125.766L121.368 37.9089H126.311L128.425 46.568H128.561L130.675 37.9089H135.618Z" fill="#8B0A5F"/>
 5 | <path d="M112.563 43.6361V50.9998H107.858V37.9089H112.324V40.3975H112.46C112.744 39.5679 113.244 38.9174 113.96 38.4458C114.682 37.9742 115.523 37.7384 116.483 37.7384C117.409 37.7384 118.213 37.9515 118.895 38.3776C119.582 38.7981 120.114 39.3776 120.489 40.1162C120.869 40.8549 121.057 41.6986 121.051 42.6475V50.9998H116.347V43.6361C116.352 42.9884 116.188 42.4799 115.852 42.1106C115.523 41.7412 115.063 41.5566 114.472 41.5566C114.085 41.5566 113.747 41.6418 113.457 41.8123C113.173 41.977 112.955 42.2157 112.801 42.5282C112.648 42.835 112.568 43.2043 112.563 43.6361Z" fill="#8B0A5F"/>
 6 | <path d="M97.8063 51.2043C96.9711 51.2043 96.2324 51.068 95.5904 50.7952C94.954 50.5168 94.454 50.0964 94.0904 49.5339C93.7267 48.9714 93.5449 48.2554 93.5449 47.3861C93.5449 46.6702 93.6671 46.0594 93.9114 45.5537C94.1557 45.0424 94.4966 44.6248 94.9341 44.3009C95.3716 43.977 95.8801 43.7299 96.4597 43.5594C97.0449 43.389 97.6756 43.2782 98.3517 43.227C99.0847 43.1702 99.6728 43.102 100.116 43.0225C100.565 42.9373 100.889 42.8208 101.088 42.6731C101.286 42.5197 101.386 42.3179 101.386 42.0679V42.0339C101.386 41.693 101.255 41.4316 100.994 41.2498C100.732 41.0679 100.397 40.977 99.9881 40.977C99.5392 40.977 99.1728 41.0765 98.8887 41.2753C98.6103 41.4685 98.4426 41.7668 98.3858 42.1702H94.0563C94.1131 41.3748 94.3659 40.6418 94.8148 39.9714C95.2694 39.2952 95.9313 38.7554 96.8006 38.352C97.6699 37.9429 98.7551 37.7384 100.056 37.7384C100.994 37.7384 101.835 37.8492 102.579 38.0708C103.323 38.2867 103.957 38.5907 104.48 38.9827C105.002 39.3691 105.4 39.8236 105.673 40.3464C105.951 40.8634 106.09 41.4259 106.09 42.0339V50.9998H101.693V49.1589H101.59C101.329 49.6475 101.011 50.0424 100.636 50.3435C100.267 50.6447 99.8432 50.8634 99.3659 50.9998C98.8944 51.1361 98.3745 51.2043 97.8063 51.2043ZM99.3404 48.2384C99.6983 48.2384 100.034 48.1645 100.346 48.0168C100.664 47.8691 100.923 47.656 101.122 47.3776C101.32 47.0992 101.42 46.7611 101.42 46.3634V45.2725C101.295 45.3236 101.161 45.3719 101.019 45.4174C100.883 45.4628 100.735 45.5055 100.576 45.5452C100.423 45.585 100.258 45.6219 100.082 45.656C99.9114 45.6901 99.7324 45.7214 99.5449 45.7498C99.1813 45.8066 98.883 45.9003 98.65 46.031C98.4228 46.156 98.2523 46.3123 98.1387 46.4998C98.0307 46.6816 97.9767 46.8861 97.9767 47.1134C97.9767 47.477 98.1046 47.7554 98.3603 47.9486C98.6159 48.1418 98.9426 48.2384 99.3404 48.2384Z" fill="#8B0A5F"/>
 7 | <path d="M92.4205 40.0908H87.6137C87.5796 39.6931 87.4887 39.3323 87.341 39.0084C87.1989 38.6845 87.0001 38.4061 86.7444 38.1732C86.4944 37.9345 86.1904 37.7527 85.8325 37.6277C85.4745 37.497 85.0682 37.4317 84.6137 37.4317C83.8182 37.4317 83.145 37.6249 82.5938 38.0112C82.0484 38.3976 81.6336 38.9516 81.3495 39.6732C81.0711 40.3948 80.9319 41.2612 80.9319 42.2726C80.9319 43.3408 81.0739 44.2357 81.358 44.9573C81.6478 45.6732 82.0654 46.213 82.6109 46.5766C83.1563 46.9345 83.8126 47.1135 84.5796 47.1135C85.0171 47.1135 85.4092 47.0595 85.7557 46.9516C86.1023 46.838 86.4035 46.676 86.6592 46.4658C86.9148 46.2556 87.1222 46.0027 87.2813 45.7073C87.4461 45.4061 87.5569 45.0681 87.6137 44.6931L92.4205 44.7272C92.3637 45.4658 92.1563 46.2186 91.7984 46.9857C91.4404 47.747 90.9319 48.4516 90.2728 49.0993C89.6194 49.7414 88.8097 50.2584 87.8438 50.6505C86.8779 51.0425 85.7557 51.2385 84.4773 51.2385C82.8751 51.2385 81.4376 50.8948 80.1648 50.2073C78.8978 49.5198 77.895 48.5084 77.1563 47.1732C76.4234 45.838 76.0569 44.2044 76.0569 42.2726C76.0569 40.3294 76.4319 38.6931 77.1819 37.3635C77.9319 36.0283 78.9432 35.0198 80.216 34.338C81.4887 33.6505 82.9092 33.3067 84.4773 33.3067C85.5796 33.3067 86.5938 33.4573 87.52 33.7584C88.4461 34.0595 89.2586 34.4999 89.9575 35.0794C90.6563 35.6533 91.2188 36.3607 91.645 37.2016C92.0711 38.0425 92.3296 39.0056 92.4205 40.0908Z" fill="#8B0A5F"/>
 8 | <path d="M138.983 9.54547V27H135.028L128.721 17.8296H128.619V27H123.88V9.54547H127.903L134.108 18.6818H134.244V9.54547H138.983Z" fill="#8B0A5F"/>
 9 | <path d="M122.168 18.2726C122.168 20.2158 121.79 21.855 121.034 23.1902C120.279 24.5198 119.259 25.5283 117.975 26.2158C116.691 26.8976 115.259 27.2385 113.679 27.2385C112.088 27.2385 110.651 26.8948 109.367 26.2073C108.088 25.5141 107.071 24.5027 106.316 23.1732C105.566 21.838 105.191 20.2044 105.191 18.2726C105.191 16.3294 105.566 14.6931 106.316 13.3635C107.071 12.0283 108.088 11.0198 109.367 10.338C110.651 9.65045 112.088 9.3067 113.679 9.3067C115.259 9.3067 116.691 9.65045 117.975 10.338C119.259 11.0198 120.279 12.0283 121.034 13.3635C121.79 14.6931 122.168 16.3294 122.168 18.2726ZM117.293 18.2726C117.293 17.2272 117.154 16.3465 116.875 15.6306C116.602 14.909 116.196 14.3635 115.656 13.9942C115.122 13.6192 114.463 13.4317 113.679 13.4317C112.895 13.4317 112.233 13.6192 111.693 13.9942C111.159 14.3635 110.753 14.909 110.475 15.6306C110.202 16.3465 110.066 17.2272 110.066 18.2726C110.066 19.3181 110.202 20.2016 110.475 20.9232C110.753 21.6391 111.159 22.1845 111.693 22.5595C112.233 22.9289 112.895 23.1135 113.679 23.1135C114.463 23.1135 115.122 22.9289 115.656 22.5595C116.196 22.1845 116.602 21.6391 116.875 20.9232C117.154 20.2016 117.293 19.3181 117.293 18.2726Z" fill="#8B0A5F"/>
10 | <path d="M99.1634 14.9999C99.118 14.4317 98.9049 13.9885 98.5242 13.6703C98.1492 13.3522 97.5782 13.1931 96.8112 13.1931C96.3225 13.1931 95.922 13.2527 95.6095 13.372C95.3026 13.4857 95.0754 13.6419 94.9276 13.8408C94.7799 14.0397 94.7032 14.2669 94.6975 14.5226C94.6862 14.7328 94.7231 14.9232 94.8083 15.0936C94.8992 15.2584 95.0413 15.409 95.2345 15.5453C95.4276 15.676 95.6748 15.7953 95.9759 15.9033C96.2771 16.0112 96.635 16.1078 97.0498 16.1931L98.4816 16.4999C99.4475 16.7044 100.274 16.9743 100.962 17.3095C101.649 17.6448 102.212 18.0397 102.649 18.4942C103.087 18.9431 103.408 19.4487 103.612 20.0112C103.823 20.5737 103.93 21.1874 103.936 21.8522C103.93 22.9999 103.644 23.9715 103.075 24.7669C102.507 25.5624 101.695 26.1675 100.638 26.5823C99.5867 26.997 98.3225 27.2044 96.8452 27.2044C95.3282 27.2044 94.0043 26.98 92.8737 26.5311C91.7487 26.0823 90.8737 25.3919 90.2487 24.4601C89.6293 23.5226 89.3168 22.3237 89.3112 20.8635H93.8112C93.8396 21.3976 93.9731 21.8465 94.2117 22.2101C94.4504 22.5737 94.7856 22.8493 95.2174 23.0368C95.6549 23.2243 96.1748 23.3181 96.7771 23.3181C97.2827 23.3181 97.706 23.2556 98.047 23.1306C98.3879 23.0056 98.6464 22.8323 98.8225 22.6107C98.9987 22.3891 99.0896 22.1362 99.0952 21.8522C99.0896 21.5851 99.0015 21.3522 98.831 21.1533C98.6663 20.9487 98.3935 20.7669 98.0129 20.6078C97.6322 20.4431 97.118 20.2897 96.4702 20.1476L94.7316 19.7726C93.1862 19.4374 91.9674 18.8777 91.0754 18.0936C90.189 17.3039 89.7487 16.2272 89.7543 14.8635C89.7487 13.7556 90.0441 12.7868 90.6407 11.9573C91.243 11.122 92.0754 10.4715 93.1379 10.0056C94.206 9.53966 95.4305 9.3067 96.8112 9.3067C98.2202 9.3067 99.439 9.5425 100.467 10.0141C101.496 10.4857 102.288 11.1505 102.845 12.0084C103.408 12.8607 103.692 13.8578 103.698 14.9999H99.1634Z" fill="#8B0A5F"/>
11 | <path d="M83.3181 9.54547H87.9886V21.5114C87.9829 22.6477 87.696 23.6477 87.1278 24.5114C86.5653 25.3693 85.7869 26.0398 84.7926 26.5227C83.8039 27 82.6647 27.2387 81.3749 27.2387C80.2556 27.2387 79.2329 27.0455 78.3068 26.6591C77.3806 26.2671 76.642 25.6534 76.0909 24.8182C75.5397 23.9773 75.267 22.8864 75.2727 21.5455H80.0113C80.0284 21.983 80.1022 22.3523 80.2329 22.6534C80.3693 22.9546 80.5568 23.1818 80.7954 23.3352C81.0397 23.483 81.3352 23.5568 81.6818 23.5568C82.034 23.5568 82.3295 23.4801 82.5681 23.3267C82.8124 23.1733 82.9971 22.946 83.1221 22.6449C83.2471 22.3381 83.3124 21.9602 83.3181 21.5114V9.54547Z" fill="#8B0A5F"/>
12 | <path d="M5 60C2.23858 60 -9.78513e-08 57.7614 -2.18557e-07 55L-2.40413e-06 5C-2.52483e-06 2.23858 2.23857 -9.78513e-08 5 -2.18557e-07L55 -2.40413e-06C57.7614 -2.52483e-06 60 2.23857 60 5L60 55C60 57.7614 57.7614 60 55 60L5 60Z" fill="#8B0A5F"/>
13 | <path d="M9.23071 43.8461C9.23071 39.1729 13.0191 35.3846 17.6923 35.3846V35.3846C22.3654 35.3846 26.1538 39.1729 26.1538 43.8461V43.8461C26.1538 48.5193 22.3654 52.3077 17.6922 52.3077V52.3077C13.0191 52.3077 9.23071 48.5193 9.23071 43.8461V43.8461Z" fill="white"/>
14 | <path d="M35.3845 17.6924C35.3845 13.0192 39.1729 9.23084 43.8461 9.23084V9.23084C48.5192 9.23084 52.3076 13.0192 52.3076 17.6924V17.6924C52.3076 22.3656 48.5192 26.1539 43.8461 26.1539V26.1539C39.1729 26.1539 35.3845 22.3655 35.3845 17.6924V17.6924Z" fill="white"/>
15 | <path fill-rule="evenodd" clip-rule="evenodd" d="M47.6924 33.9422C47.6924 41.5362 41.5363 47.6923 33.9424 47.6923L30.7693 47.6923L30.7693 41.3461L33.9424 41.3461C38.0314 41.3461 41.3462 38.0313 41.3462 33.9423L41.3462 30.7692L47.6924 30.7692L47.6924 33.9422Z" fill="white"/>
16 | </svg>
17 | 


--------------------------------------------------------------------------------
/readme.md:
--------------------------------------------------------------------------------
1 | # An open file format for infinite canvas data.
2 | 
3 | Infinite canvas tools are a way to view and organize information spatially, like a digital whiteboard. Infinite canvases encourage freedom and exploration, and have become a popular interface pattern across many apps.
4 | 
5 | The JSON Canvas format was created to provide longevity, readability, interoperability, and extensibility to data created with infinite canvas apps. The format is designed to be easy to parse and give users [ownership over their data](https://stephango.com/file-over-app). JSON Canvas files use the `.canvas` extension. 
6 | 
7 | JSON Canvas was originally created for [Obsidian](https://obsidian.md/blog/json-canvas/). JSON Canvas can be implemented freely as an import, export, and storage format for any [app or tool](/docs/apps.md). This site, and all the resources associated with JSON Canvas are [open source](https://github.com/obsidianmd/jsoncanvas) under the MIT license.
8 | 


--------------------------------------------------------------------------------
/sample.canvas:
--------------------------------------------------------------------------------
 1 | {
 2 | 	"nodes":[
 3 | 		{"id":"754a8ef995f366bc","type":"group","x":-300,"y":-460,"width":610,"height":200,"label":"JSON Canvas"},
 4 | 		{"id":"8132d4d894c80022","type":"file","file":"readme.md","x":-280,"y":-200,"width":570,"height":560,"color":"6"},
 5 | 		{"id":"7efdbbe0c4742315","type":"file","file":"_site/logo.svg","x":-280,"y":-440,"width":217,"height":80},
 6 | 		{"id":"59e896bc8da20699","type":"text","text":"Learn more:\n\n- [Apps](/docs/apps.md)\n- [Spec](spec/1.0.md)\n- [Github](https://github.com/obsidianmd/jsoncanvas)","x":40,"y":-440,"width":250,"height":160},
 7 | 		{"id":"0ba565e7f30e0652","type":"file","file":"spec/1.0.md","x":360,"y":-400,"width":400,"height":400}
 8 | 	],
 9 | 	"edges":[
10 | 		{"id":"6fa11ab87f90b8af","fromNode":"7efdbbe0c4742315","fromSide":"right","toNode":"59e896bc8da20699","toSide":"left"}
11 | 	]
12 | }


--------------------------------------------------------------------------------
/spec/1.0.md:
--------------------------------------------------------------------------------
  1 | # JSON Canvas Spec
  2 | 
  3 | <small>Version 1.0 — 2024-03-11</small>
  4 | 
  5 | ## Top level
  6 | 
  7 | The top level of JSON Canvas contains two arrays:
  8 | 
  9 | - `nodes` (optional, array of nodes)
 10 | - `edges` (optional, array of edges)
 11 | 
 12 | ## Nodes
 13 | 
 14 | Nodes are objects within the canvas. Nodes may be text, files, links, or groups.
 15 | 
 16 | Nodes are placed in the array in ascending order by z-index. The first node in the array should be displayed below all other nodes, and the last node in the array should be displayed on top of all other nodes.
 17 | 
 18 | ### Generic node
 19 | 
 20 | All nodes include the following attributes:
 21 | 
 22 | - `id` (required, string) is a unique ID for the node.
 23 | - `type` (required, string) is the node type.
 24 |   - `text`
 25 |   - `file`
 26 |   - `link`
 27 |   - `group`
 28 | - `x` (required, integer) is the `x` position of the node in pixels.
 29 | - `y` (required, integer) is the `y` position of the node in pixels.
 30 | - `width` (required, integer) is the width of the node in pixels.
 31 | - `height` (required, integer) is the height of the node in pixels.
 32 | - `color` (optional, `canvasColor`) is the color of the node, see the Color section.
 33 | 
 34 | ### Text type nodes
 35 | 
 36 | Text type nodes store text. Along with generic node attributes, text nodes include the following attribute:
 37 | 
 38 | - `text` (required, string) in plain text with Markdown syntax.
 39 | 
 40 | ### File type nodes
 41 | 
 42 | File type nodes reference other files or attachments, such as images, videos, etc. Along with generic node attributes, file nodes include the following attributes:
 43 | 
 44 | - `file` (required, string) is the path to the file within the system.
 45 | - `subpath` (optional, string) is a subpath that may link to a heading or a block. Always starts with a `#`.
 46 | 
 47 | ### Link type nodes
 48 | 
 49 | Link type nodes reference a URL. Along with generic node attributes, link nodes include the following attribute:
 50 | 
 51 | - `url` (required, string)
 52 | 
 53 | ### Group type nodes
 54 | 
 55 | Group type nodes are used as a visual container for nodes within it. Along with generic node attributes, group nodes include the following attributes:
 56 | 
 57 | - `label` (optional, string) is a text label for the group.
 58 | - `background` (optional, string) is the path to the background image.
 59 | - `backgroundStyle` (optional, string) is the rendering style of the background image. Valid values:
 60 |   - `cover` fills the entire width and height of the node.
 61 |   - `ratio` maintains the aspect ratio of the background image.
 62 |   - `repeat` repeats the image as a pattern in both x/y directions.
 63 | 
 64 | ## Edges
 65 | 
 66 | Edges are lines that connect one node to another.
 67 | 
 68 | - `id` (required, string) is a unique ID for the edge.
 69 | - `fromNode` (required, string) is the node `id` where the connection starts.
 70 | - `fromSide` (optional, string) is the side where this edge starts. Valid values:
 71 |   - `top`
 72 |   - `right`
 73 |   - `bottom`
 74 |   - `left`
 75 | - `fromEnd` (optional, string) is the shape of the endpoint at the edge start. Defaults to `none` if not specified. Valid values:
 76 |   - `none`
 77 |   - `arrow`
 78 | - `toNode` (required, string) is the node `id` where the connection ends.
 79 | - `toSide` (optional, string) is the side where this edge ends. Valid values:
 80 |   - `top`
 81 |   - `right`
 82 |   - `bottom`
 83 |   - `left`
 84 | - `toEnd`  (optional, string) is the shape of the endpoint at the edge end. Defaults to `arrow` if not specified. Valid values:
 85 |   - `none`
 86 |   - `arrow`
 87 | - `color` (optional, `canvasColor`) is the color of the line, see the Color section.
 88 | - `label` (optional, string) is a text label for the edge.
 89 | 
 90 | 
 91 | ## Color
 92 | 
 93 | The `canvasColor` type is used to encode color data for nodes and edges. Colors attributes expect a string. Colors can be specified in hex format e.g. `"#FF0000"`, or using one of the preset colors, e.g. `"1"` for red. Six preset colors exist, mapped to the following numbers:
 94 | 
 95 | - `"1"` red
 96 | - `"2"` orange
 97 | - `"3"` yellow
 98 | - `"4"` green
 99 | - `"5"` cyan
100 | - `"6"` purple
101 | 
102 | Specific values for the preset colors are intentionally not defined so that applications can tailor the presets to their specific brand colors or color scheme.
103 | 


---------------------------------------------------------