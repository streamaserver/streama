<%@ page import="streama.Settings" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${ogTitle?.encodeAsHTML()}</title>

  <!-- Open Graph -->
  <meta property="og:title" content="${ogTitle?.encodeAsHTML()}" />
  <meta property="og:description" content="${ogDescription?.encodeAsHTML()}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:url" content="${request.requestURL}?${request.queryString}" />
  <g:if test="${ogImage}">
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="500" />
  <meta property="og:image:height" content="750" />
  </g:if>
  <meta property="og:site_name" content="${appTitle?.encodeAsHTML()}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${ogTitle?.encodeAsHTML()}" />
  <meta name="twitter:description" content="${ogDescription?.encodeAsHTML()}" />
  <g:if test="${ogImage}">
  <meta name="twitter:image" content="${ogImage}" />
  </g:if>

  <!-- General -->
  <meta name="description" content="${ogDescription?.encodeAsHTML()}" />

  <g:linkRelIconSetting setting="${Settings.findByName('favicon').value}"></g:linkRelIconSetting>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0a0a;
      color: #fff;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    a { color: inherit; text-decoration: none; }

    /* Loading */
    .share-loading {
      display: flex; align-items: center; justify-content: center;
      height: 100vh; font-size: 14px; color: #666;
    }
    .share-error {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 100vh; color: #666; gap: 12px;
    }
    .share-error h2 { font-size: 24px; color: #999; }

    /* Backdrop */
    .share-backdrop {
      position: fixed; top: 0; left: 0; right: 0; height: 70vh;
      background-size: cover; background-position: center 20%;
      z-index: 0;
    }
    .share-backdrop::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(180deg,
        rgba(10,10,10,0.2) 0%,
        rgba(10,10,10,0.5) 50%,
        rgba(10,10,10,1) 100%);
    }
    .share-backdrop-noise {
      position: absolute; inset: 0; opacity: 0.02;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 200px;
    }

    /* Header */
    .share-header {
      position: relative; z-index: 10;
      padding: 20px 40px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .share-logo img { max-height: 28px; }
    .share-logo-text { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; }

    /* Content */
    .share-content {
      position: relative; z-index: 10;
      max-width: 1100px; margin: 0 auto;
      padding: 60px 40px 80px;
      display: flex; gap: 48px; align-items: flex-start;
    }

    /* Poster */
    .share-poster {
      width: 300px; flex-shrink: 0;
      border-radius: 8px; overflow: hidden;
      box-shadow: 0 8px 40px rgba(0,0,0,0.6);
    }
    .share-poster img { width: 100%; display: block; }
    .share-poster-placeholder {
      width: 100%; aspect-ratio: 2/3;
      background: #1a1a1a; display: flex;
      align-items: center; justify-content: center;
      font-size: 48px; color: #333;
    }

    /* Info */
    .share-info { flex: 1; min-width: 0; }
    .share-type {
      font-size: 12px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; color: #B0DDEF; margin-bottom: 8px;
    }
    .share-title {
      font-size: 48px; font-weight: 800; letter-spacing: -0.03em;
      line-height: 1.05; margin-bottom: 16px;
    }

    /* Meta row */
    .share-meta {
      display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
      margin-bottom: 20px; font-size: 14px; color: #999;
    }
    .share-meta-dot { color: #444; }
    .share-rating {
      display: inline-flex; align-items: center; gap: 4px;
      background: rgba(255,255,255,0.08); padding: 3px 10px;
      border-radius: 4px; font-weight: 600; color: #f5c518;
    }
    .share-rating svg { width: 14px; height: 14px; }

    /* Genres */
    .share-genres {
      display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;
    }
    .share-genre {
      padding: 4px 14px; border-radius: 500px;
      border: 1px solid rgba(255,255,255,0.12);
      font-size: 12px; font-weight: 500; color: #ccc;
    }

    /* Overview */
    .share-overview {
      font-size: 16px; line-height: 1.7; color: #b0b0b0;
      max-width: 640px; margin-bottom: 32px;
    }

    /* Seasons */
    .share-seasons {
      margin-bottom: 32px;
    }
    .share-seasons-title {
      font-size: 14px; font-weight: 600; color: #888;
      text-transform: uppercase; letter-spacing: 0.05em;
      margin-bottom: 12px;
    }
    .share-season-grid {
      display: flex; gap: 8px; flex-wrap: wrap;
    }
    .share-season-chip {
      background: rgba(255,255,255,0.06); border-radius: 6px;
      padding: 10px 16px; text-align: center; min-width: 90px;
    }
    .share-season-num { font-size: 14px; font-weight: 600; }
    .share-season-eps { font-size: 11px; color: #888; margin-top: 2px; }

    /* Runtime */
    .share-runtime {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 13px; color: #888;
    }

    /* CTA */
    .share-cta { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
    .share-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 32px; border-radius: 8px;
      font-size: 15px; font-weight: 600;
      cursor: pointer; border: none;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .share-btn:hover { transform: translateY(-1px); }
    .share-btn-primary {
      background: #B0DDEF; color: #0a0a0a;
      box-shadow: 0 4px 20px rgba(176,221,239,0.25);
    }
    .share-btn-primary:hover {
      box-shadow: 0 6px 28px rgba(176,221,239,0.35);
    }
    .share-btn-secondary {
      background: rgba(255,255,255,0.08); color: #fff;
      border: 1px solid rgba(255,255,255,0.12);
    }
    .share-btn-secondary:hover { background: rgba(255,255,255,0.12); }
    .share-btn svg { width: 18px; height: 18px; }

    /* Trailer */
    .share-trailer {
      margin-top: 40px;
    }
    .share-trailer-title {
      font-size: 14px; font-weight: 600; color: #888;
      text-transform: uppercase; letter-spacing: 0.05em;
      margin-bottom: 12px;
    }
    .share-trailer-embed {
      border-radius: 8px; overflow: hidden;
      aspect-ratio: 16/9; max-width: 640px;
      background: #111;
    }
    .share-trailer-embed iframe {
      width: 100%; height: 100%; border: none;
    }

    /* IMDB link */
    .share-imdb {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 13px; color: #f5c518; font-weight: 600;
      padding: 6px 12px; border-radius: 4px;
      background: rgba(245,197,24,0.08);
      transition: background 0.15s ease;
    }
    .share-imdb:hover { background: rgba(245,197,24,0.15); text-decoration: none; }

    /* Footer */
    .share-footer {
      position: relative; z-index: 10;
      text-align: center; padding: 40px;
      font-size: 12px; color: #444;
      border-top: 1px solid rgba(255,255,255,0.04);
    }

    /* Share button */
    .share-copy-btn {
      background: none; border: 1px solid rgba(255,255,255,0.15);
      color: #999; padding: 8px 16px; border-radius: 6px;
      font-size: 13px; cursor: pointer; font-family: inherit;
      transition: all 0.15s ease;
    }
    .share-copy-btn:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
    .share-copy-btn.copied { border-color: #B0DDEF; color: #B0DDEF; }

    /* Responsive */
    @media (max-width: 768px) {
      .share-content {
        flex-direction: column; align-items: center;
        padding: 30px 20px 60px; gap: 28px; text-align: center;
      }
      .share-poster { width: 200px; }
      .share-title { font-size: 32px; }
      .share-meta, .share-genres, .share-cta { justify-content: center; }
      .share-header { padding: 16px 20px; }
    }
  </style>
</head>
<body>

  <div id="share-app">
    <div class="share-loading" id="share-loading">Loading...</div>
  </div>

  <script>
    var MEDIA_TYPE = '${mediaType}';
    var MEDIA_ID = '${mediaId}';
    var CONTEXT_PATH = '${request.contextPath}';

    fetch(CONTEXT_PATH + '/share/show.json?mediaType=' + MEDIA_TYPE + '&id=' + MEDIA_ID)
      .then(function(r) {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(renderPage)
      .catch(function() {
        document.getElementById('share-app').innerHTML =
          '<div class="share-error"><h2>Not Found</h2><p>This content is not available.</p>' +
          '<a href="' + CONTEXT_PATH + '/login/auth" style="color:#B0DDEF">Go to Login</a></div>';
      });

    function renderPage(data) {
      var isShow = data.mediaType === 'tvShow';
      var year = (data.release_date || data.first_air_date || '').substring(0, 4);
      var genres = (data.genre || []).map(function(g) {
        return '<span class="share-genre">' + g.name + '</span>';
      }).join('');

      var ratingHtml = '';
      if (data.vote_average) {
        ratingHtml = '<span class="share-rating">' +
          '<svg viewBox="0 0 24 24" fill="#f5c518"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' +
          (data.vote_average ? data.vote_average.toFixed(1) : '') + '</span>';
      }

      var metaParts = [];
      if (year) metaParts.push(year);
      if (isShow && data.seasonCount) metaParts.push(data.seasonCount + ' Season' + (data.seasonCount > 1 ? 's' : ''));
      if (isShow && data.episodeCount) metaParts.push(data.episodeCount + ' Episodes');
      if (!isShow && data.runtime) metaParts.push(data.runtime + ' min');
      if (data.original_language) metaParts.push(data.original_language.toUpperCase());

      var metaHtml = metaParts.join('<span class="share-meta-dot">&bull;</span>');

      var seasonsHtml = '';
      if (isShow && data.seasons && data.seasons.length) {
        seasonsHtml = '<div class="share-seasons"><div class="share-seasons-title">Seasons</div><div class="share-season-grid">' +
          data.seasons.map(function(s) {
            return '<div class="share-season-chip"><div class="share-season-num">Season ' + s.number + '</div>' +
              '<div class="share-season-eps">' + s.episodeCount + ' episodes</div></div>';
          }).join('') + '</div></div>';
      }

      var ctaHtml = '';
      if (data.isLoggedIn) {
        var watchUrl = CONTEXT_PATH + '/#/dash?mediaModal=' + data.id + '&mediaType=' + data.mediaType;
        ctaHtml = '<a href="' + watchUrl + '" class="share-btn share-btn-primary">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Watch Now</a>';
      } else {
        ctaHtml = '<a href="' + CONTEXT_PATH + '/login/auth" class="share-btn share-btn-primary">' +
          'Log In to Watch</a>' +
          '<a href="' + CONTEXT_PATH + '/login/auth" class="share-btn share-btn-secondary">' +
          'Request Access</a>';
      }

      var trailerHtml = '';
      if (data.trailerKey) {
        trailerHtml = '<div class="share-trailer"><div class="share-trailer-title">Trailer</div>' +
          '<div class="share-trailer-embed"><iframe src="https://www.youtube.com/embed/' +
          data.trailerKey + '?rel=0" allowfullscreen></iframe></div></div>';
      }

      var imdbHtml = '';
      if (data.imdb_id) {
        imdbHtml = '<a href="https://www.imdb.com/title/' + data.imdb_id + '" target="_blank" class="share-imdb">IMDb</a>';
      }

      var posterHtml = data.poster_path
        ? '<img src="' + data.poster_path + '" alt="' + data.title + '">'
        : '<div class="share-poster-placeholder">&#127916;</div>';

      var backdropStyle = data.backdrop_path
        ? 'background-image: url(\'' + data.backdrop_path + '\')'
        : 'background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)';

      // Update page title
      document.title = data.title + ' - ' + data.appTitle;

      document.getElementById('share-app').innerHTML =
        '<div class="share-backdrop" style="' + backdropStyle + '"><div class="share-backdrop-noise"></div></div>' +

        '<div class="share-header">' +
          '<a href="' + CONTEXT_PATH + '/" class="share-logo"><span class="share-logo-text">' + data.appTitle + '</span></a>' +
          '<button class="share-copy-btn" onclick="copyShareLink(this)">Copy Link</button>' +
        '</div>' +

        '<div class="share-content">' +
          '<div class="share-poster">' + posterHtml + '</div>' +
          '<div class="share-info">' +
            '<div class="share-type">' + (isShow ? 'TV Show' : 'Movie') + '</div>' +
            '<h1 class="share-title">' + data.title + '</h1>' +
            '<div class="share-meta">' + ratingHtml + metaHtml + imdbHtml + '</div>' +
            (genres ? '<div class="share-genres">' + genres + '</div>' : '') +
            (data.overview ? '<div class="share-overview">' + data.overview + '</div>' : '') +
            seasonsHtml +
            '<div class="share-cta">' + ctaHtml + '</div>' +
            trailerHtml +
          '</div>' +
        '</div>' +

        '<div class="share-footer">Shared from ' + data.appTitle + '</div>';
    }

    function copyShareLink(btn) {
      navigator.clipboard.writeText(window.location.href).then(function() {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function() {
          btn.textContent = 'Copy Link';
          btn.classList.remove('copied');
        }, 2000);
      });
    }
  </script>

</body>
</html>
