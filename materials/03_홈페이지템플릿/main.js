/* ============================================================================
 *  홈페이지를 그려주는 파일 (기능 담당)
 *
 *  ※ 이 파일은 고치지 않으셔도 됩니다.
 *     내용을 바꾸시려면  assets/js/site-data.js  를 열어주세요.
 * ========================================================================== */

(function () {
  'use strict';

  /* ---------- 도우미 ---------- */

  // 글자에 <, > 같은 기호가 있어도 화면이 깨지지 않게 처리
  function esc(text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // '2026-08-16' → '2026. 08. 16.'
  function fmtDate(d) {
    var m = String(d || '').match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!m) return esc(d);
    return m[1] + '. ' + ('0' + m[2]).slice(-2) + '. ' + ('0' + m[3]).slice(-2) + '.';
  }

  // '2026-07' → '2026년 7월'
  function fmtMonth(d) {
    var m = String(d || '').match(/^(\d{4})-(\d{1,2})/);
    return m ? m[1] + '년 ' + Number(m[2]) + '월' : esc(d);
  }

  function $(sel) { return document.querySelector(sel); }

  function fill(sel, html) {
    var el = $(sel);
    if (el) el.innerHTML = html;
    return el;
  }

  // 데이터 파일이 없거나 항목이 비어 있어도 홈페이지가 죽지 않도록
  function safeArr(v) { return Array.isArray(v) ? v : []; }
  function safeObj(v) { return (v && typeof v === 'object') ? v : {}; }

  var INFO   = safeObj(typeof 교회정보 !== 'undefined' ? 교회정보 : null);
  var 예배   = safeArr(typeof 예배시간 !== 'undefined' ? 예배시간 : null);
  var 공지   = safeArr(typeof 공지사항 !== 'undefined' ? 공지사항 : null);
  var 설교   = safeArr(typeof 설교영상 !== 'undefined' ? 설교영상 : null);
  var 사진   = safeArr(typeof 갤러리   !== 'undefined' ? 갤러리   : null);
  var 길     = safeObj(typeof 오시는길 !== 'undefined' ? 오시는길 : null);
  var 소개   = safeObj(typeof 교회소개 !== 'undefined' ? 교회소개 : null);
  var 새가족 = safeArr(typeof 새가족안내 !== 'undefined' ? 새가족안내 : null);

  var 이름 = INFO.이름 || '우리교회';


  /* =========================================================================
   *  머리말 / 꼬리말
   * ======================================================================= */

  var MENU = [
    { href: 'index.html',    label: '홈' },
    { href: 'about.html',    label: '교회 소개' },
    { href: 'worship.html',  label: '예배 안내' },
    { href: 'sermons.html',  label: '설교 말씀' },
    { href: 'news.html',     label: '공지사항' },
    { href: 'gallery.html',  label: '사진' },
    { href: 'location.html', label: '오시는 길' },
  ];

  function currentPage() {
    var p = location.pathname.split('/').pop();
    return (!p || p === '') ? 'index.html' : p;
  }

  function renderHeader() {
    var here = currentPage();
    var items = MENU.map(function (m) {
      var cur = (m.href === here) ? ' aria-current="page"' : '';
      return '<li><a href="' + m.href + '"' + cur + '>' + esc(m.label) + '</a></li>';
    }).join('');

    var cross =
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">' +
      '<path d="M10.4 2h3.2v5.6H19v3.2h-5.4V22h-3.2V10.8H5V7.6h5.4z"/></svg>';

    fill('#site-header',
      '<a class="skip-link" href="#main">본문으로 바로가기</a>' +
      '<div class="wrap header-inner">' +
        '<a class="logo" href="index.html">' +
          '<span class="logo-mark" aria-hidden="true">' + cross + '</span>' +
          '<span class="logo-text">' +
            '<span class="logo-name">' + esc(이름) + '</span>' +
            (INFO.영문이름 ? '<span class="logo-sub">' + esc(INFO.영문이름) + '</span>' : '') +
          '</span>' +
        '</a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mainnav">☰ 메뉴</button>' +
        '<nav class="nav" id="mainnav" aria-label="주요 메뉴"><ul>' + items + '</ul></nav>' +
      '</div>'
    );

    var btn = $('.nav-toggle'), nav = $('#mainnav');
    if (btn && nav) {
      btn.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.textContent = open ? '✕ 닫기' : '☰ 메뉴';
      });
    }
  }

  function renderFooter() {
    var links = MENU.slice(1).map(function (m) {
      return '<li><a href="' + m.href + '">' + esc(m.label) + '</a></li>';
    }).join('');

    var sns = '';
    if (INFO.유튜브채널) sns += '<p><a href="' + esc(INFO.유튜브채널) + '" target="_blank" rel="noopener">유튜브 채널</a></p>';
    if (INFO.인스타그램) sns += '<p><a href="' + esc(INFO.인스타그램) + '" target="_blank" rel="noopener">인스타그램</a></p>';
    if (INFO.카카오채널) sns += '<p><a href="' + esc(INFO.카카오채널) + '" target="_blank" rel="noopener">카카오톡 채널</a></p>';

    var year = new Date().getFullYear();

    fill('#site-footer',
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<h4>' + esc(이름) + '</h4>' +
            (INFO.한줄소개 ? '<p>' + esc(INFO.한줄소개) + '</p>' : '') +
            (INFO.교단 ? '<p>' + esc(INFO.교단) + '</p>' : '') +
          '</div>' +
          '<div>' +
            '<h4>찾아오시는 길</h4>' +
            '<p>' + esc(INFO.주소 || '') + '</p>' +
            (INFO.주소상세 ? '<p>' + esc(INFO.주소상세) + '</p>' : '') +
          '</div>' +
          '<div>' +
            '<h4>문의</h4>' +
            (INFO.전화 ? '<p>전화 <a href="tel:' + esc(String(INFO.전화).replace(/[^0-9+]/g, '')) + '">' + esc(INFO.전화) + '</a></p>' : '') +
            (INFO.이메일 ? '<p>이메일 <a href="mailto:' + esc(INFO.이메일) + '">' + esc(INFO.이메일) + '</a></p>' : '') +
            sns +
          '</div>' +
          '<div>' +
            '<h4>바로가기</h4>' +
            '<ul class="footer-links">' + links + '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">© ' + year + ' ' + esc(이름) + '. All rights reserved.</div>' +
      '</div>'
    );
  }


  /* =========================================================================
   *  홈 화면 큰 그림 (메인 사진) + 환영 문구
   * ======================================================================= */

  function renderHero() {
    var hero = $('.hero');
    if (!hero) return;

    // 환영 문구
    var title = $('#hero-title');
    if (title) {
      title.textContent = INFO.환영문구 || (이름 + '에 오신 것을 환영합니다');
    }

    // 메인 그림 / 사진
    var img = $('#hero-img');
    if (img && INFO.메인사진) {
      img.src = INFO.메인사진;
      img.hidden = false;
      hero.classList.add('has-photo');
    }
  }


  /* =========================================================================
   *  예배 시간표
   * ======================================================================= */

  function worshipItem(w) {
    var meta = [w.장소, w.설명].filter(Boolean).join(' · ');
    return '<div class="worship-item">' +
      '<span class="worship-name">' + esc(w.이름) + '</span>' +
      '<span class="worship-time">' + esc(w.시간) + '</span>' +
      (meta ? '<span class="worship-meta">' + esc(meta) + '</span>' : '') +
    '</div>';
  }

  function renderWorship() {
    // 전체 시간표 (예배 안내 페이지)
    if ($('#worship-full')) {
      var groups = [];
      예배.forEach(function (w) {
        var g = w.구분 || '예배';
        if (groups.indexOf(g) === -1) groups.push(g);
      });

      var html = groups.map(function (g) {
        var list = 예배.filter(function (w) { return (w.구분 || '예배') === g; })
                       .map(worshipItem).join('');
        return '<div class="worship-group"><h3>' + esc(g) + '</h3>' +
               '<div class="worship-list">' + list + '</div></div>';
      }).join('');

      fill('#worship-full', html || '<p class="center">등록된 예배가 없습니다.</p>');
    }

    // 홈 화면 요약 (주일예배만)
    if ($('#worship-preview')) {
      var sunday = 예배.filter(function (w) { return w.구분 === '주일예배'; });
      if (!sunday.length) sunday = 예배.slice(0, 3);
      fill('#worship-preview',
        '<div class="worship-list">' + sunday.map(worshipItem).join('') + '</div>');
    }
  }


  /* =========================================================================
   *  공지사항  (제목을 누르면 내용이 펼쳐집니다)
   * ======================================================================= */

  function sortedNotices() {
    return 공지.slice().sort(function (a, b) {
      if (!!a.중요 !== !!b.중요) return a.중요 ? -1 : 1;
      return String(b.날짜 || '').localeCompare(String(a.날짜 || ''));
    });
  }

  function noticeHTML(n, i) {
    var id = 'notice-body-' + i;
    var tag = n.중요
      ? '<span class="tag tag-important">중요</span>'
      : '<span class="tag">' + esc(n.분류 || '공지') + '</span>';

    return '<div class="notice-item">' +
      '<button class="notice-btn" type="button" aria-expanded="false" aria-controls="' + id + '">' +
        tag +
        '<span class="notice-title">' + esc(n.제목) + '</span>' +
        '<span class="notice-date">' + fmtDate(n.날짜) + '</span>' +
        '<span class="notice-arrow" aria-hidden="true">▾</span>' +
      '</button>' +
      '<div class="notice-body" id="' + id + '" hidden>' + esc(n.내용) + '</div>' +
    '</div>';
  }

  function bindNoticeToggles(root) {
    root.querySelectorAll('.notice-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var body = document.getElementById(btn.getAttribute('aria-controls'));
        if (!body) return;
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        body.hidden = open;
      });
    });
  }

  function renderNotices() {
    var list = sortedNotices();

    var full = $('#notice-list');
    if (full) {
      full.innerHTML = list.length
        ? list.map(noticeHTML).join('')
        : '<p class="center" style="padding:40px 0">등록된 공지가 없습니다.</p>';
      bindNoticeToggles(full);
    }

    var prev = $('#notice-preview');
    if (prev) {
      prev.innerHTML = list.slice(0, 4).map(noticeHTML).join('');
      bindNoticeToggles(prev);
    }
  }


  /* =========================================================================
   *  설교 영상
   * ======================================================================= */

  function sermonHTML(s) {
    var id = String(s.유튜브ID || '').trim();
    var video = id
      ? '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '" ' +
        'title="' + esc(s.제목) + ' 설교 영상" loading="lazy" allowfullscreen ' +
        'allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>'
      : '<div class="sermon-video-empty"><strong>영상 준비 중</strong>' +
        '<span>site-data.js 의 유튜브ID를 채워주세요</span></div>';

    return '<article class="sermon-card">' +
      '<div class="sermon-video">' + video + '</div>' +
      '<div class="sermon-body">' +
        (s.본문 ? '<p class="sermon-verse">' + esc(s.본문) + '</p>' : '') +
        '<h3 class="sermon-title">' + esc(s.제목) + '</h3>' +
        '<p class="sermon-meta">' + fmtDate(s.날짜) +
          (s.설교자 ? ' · ' + esc(s.설교자) : '') + '</p>' +
      '</div>' +
    '</article>';
  }

  function renderSermons() {
    if ($('#sermon-list')) {
      fill('#sermon-list', 설교.length
        ? 설교.map(sermonHTML).join('')
        : '<p class="center">등록된 설교가 없습니다.</p>');
    }
    if ($('#sermon-preview')) {
      fill('#sermon-preview', 설교.slice(0, 2).map(sermonHTML).join(''));
    }
  }


  /* =========================================================================
   *  사진 갤러리
   * ======================================================================= */

  function galleryHTML(g) {
    var thumb = g.파일
      ? '<img src="' + esc(g.파일) + '" alt="' + esc(g.제목) + '" loading="lazy">'
      : '<div class="gallery-thumb-empty">사진 준비 중<br>' +
        '<small>assets/img 폴더에 사진을 넣어주세요</small></div>';

    return '<figure class="gallery-item">' +
      '<div class="gallery-thumb">' + thumb + '</div>' +
      '<figcaption class="gallery-caption">' +
        '<strong>' + esc(g.제목) + '</strong>' +
        '<span>' + fmtMonth(g.날짜) + '</span>' +
      '</figcaption>' +
    '</figure>';
  }

  function renderGallery() {
    if ($('#gallery-grid')) {
      fill('#gallery-grid', 사진.length
        ? 사진.map(galleryHTML).join('')
        : '<p class="center">등록된 사진이 없습니다.</p>');
    }
    if ($('#gallery-preview')) {
      fill('#gallery-preview', 사진.slice(0, 3).map(galleryHTML).join(''));
    }
  }


  /* =========================================================================
   *  오시는 길
   * ======================================================================= */

  function renderMap() {
    var box = $('#map-area');
    if (box) {
      var addr = [INFO.주소, INFO.주소상세].filter(Boolean).join(' ');
      var q = encodeURIComponent((이름 || '') + ' ' + (INFO.주소 || ''));

      box.innerHTML = 길.지도주소
        ? '<iframe src="' + esc(길.지도주소) + '" title="' + esc(이름) + ' 위치 지도" ' +
          'loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>'
        : '<div class="map-placeholder">' +
            '<p class="addr">' + esc(addr) + '</p>' +
            '<div class="map-actions">' +
              '<a class="btn btn-primary" target="_blank" rel="noopener" ' +
                'href="https://map.kakao.com/?q=' + q + '">카카오맵으로 길찾기</a>' +
              '<a class="btn btn-outline" target="_blank" rel="noopener" ' +
                'href="https://map.naver.com/p/search/' + q + '">네이버지도로 길찾기</a>' +
            '</div>' +
          '</div>';
    }

    var info = $('#way-info');
    if (info) {
      var rows = [
        ['주소',    [INFO.주소, INFO.주소상세].filter(Boolean).join(' ')],
        ['지하철',  길.지하철],
        ['버스',    길.버스],
        ['주차',    길.주차],
        ['전화',    INFO.전화],
      ].filter(function (r) { return r[1]; });

      info.innerHTML = rows.map(function (r) {
        return '<div class="info-row"><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
      }).join('');
    }
  }


  /* =========================================================================
   *  교회 소개
   * ======================================================================= */

  function renderAbout() {
    if ($('#greeting')) {
      var paras = safeArr(소개.인사말).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
      fill('#greeting',
        (소개.인사말제목 ? '<h2>' + esc(소개.인사말제목) + '</h2>' : '') +
        paras +
        (INFO.담임목사 ? '<p class="sign">' + esc(이름) + ' 담임 ' + esc(INFO.담임목사) + ' 드림</p>' : '')
      );
    }

    if ($('#values')) {
      fill('#values', safeArr(소개.가치).map(function (v, i) {
        return '<div class="card value-card">' +
          '<span class="value-num" aria-hidden="true">' + (i + 1) + '</span>' +
          '<h3>' + esc(v.제목) + '</h3><p>' + esc(v.설명) + '</p></div>';
      }).join(''));
    }

    if ($('#history')) {
      var hist = safeArr(소개.연혁);
      var sec = $('#history-section');
      if (!hist.length && sec) { sec.style.display = 'none'; }
      fill('#history', hist.map(function (h) {
        return '<li><b>' + esc(h.연도) + '</b><span>' + esc(h.내용) + '</span></li>';
      }).join(''));
    }

    if ($('#faq-list')) {
      fill('#faq-list', 새가족.map(function (f) {
        return '<div class="faq-item"><h3>' + esc(f.제목) + '</h3><p>' + esc(f.답) + '</p></div>';
      }).join(''));
    }
  }


  /* =========================================================================
   *  교회 이름·소개글을 페이지 곳곳에 자동으로 채워 넣기
   *  (HTML 안에 data-site="이름" 처럼 적힌 곳)
   * ======================================================================= */

  function fillSiteFields() {
    document.querySelectorAll('[data-site]').forEach(function (el) {
      var key = el.getAttribute('data-site');
      if (INFO[key]) el.textContent = INFO[key];
    });

    // 브라우저 탭 제목에 교회 이름 붙이기
    if (document.title.indexOf('{교회이름}') !== -1) {
      document.title = document.title.replace('{교회이름}', 이름);
    }
  }


  /* ---------- 실행 ---------- */
  function init() {
    renderHeader();
    renderFooter();
    fillSiteFields();
    renderHero();
    renderWorship();
    renderNotices();
    renderSermons();
    renderGallery();
    renderMap();
    renderAbout();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
