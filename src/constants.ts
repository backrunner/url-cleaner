import type { FilterList } from '@gorhill/ubo-core';

/**
 * uBlock Origin privacy filters text
 * Source: https://raw.githubusercontent.com/uBlockOrigin/uAssets/refs/heads/master/filters/privacy.txt
 */
export const UBO_PRIVACY_FILTERS = `
! Title: uBlock filters – Privacy
! Last modified: %timestamp%
! Expires: 7 days
! Description: |
!   Some of these filters make use of the \`important\` filter option,\`
!   which purpose is to guarantee that a filter won't be overriden by
!   exception filters.
! License: https://github.com/uBlockOrigin/uAssets/blob/master/LICENSE
! Homepage: https://github.com/uBlockOrigin/uAssets
!
! GitHub issues: https://github.com/uBlockOrigin/uAssets/issues
! GitHub pull requests: https://github.com/uBlockOrigin/uAssets/pulls

! Redirect to neutered Google Analytics
||google-analytics.com/analytics.js$script,redirect=google-analytics_analytics.js:5

! Redirect to neutered Google Analytics Experiments
||google-analytics.com/cx/api.js$script,redirect=google-analytics.com/cx/api.js:5

! https://www.reddit.com/r/uBlockOrigin/comments/xif3tf/
||googletagmanager.com/gtag/js$script,xhr,redirect=googletagmanager_gtm.js:5

! https://github.com/gorhill/uBlock/issues/1411
! https://www.reddit.com/r/firefox/comments/3pwcey/firefox_extension_download_manager_s3_asks_for/
! https://www.reddit.com/r/chrome/comments/473ves/help_how_to_remove_qipru_redirect_when_searching/
||lnkr.us^$doc
||icontent.us^$doc
||qip.ru^$doc
! https://github.com/gorhill/uBlock/issues/1411#issuecomment-201031771
||ratexchange.net^
||adnotbad.com^
||serverads.net^
||tradeadsexchange.com^

! https://www.reddit.com/r/ublock/comments/47o2ih/ublock_disabling_all_javascript_links/d0fhock
! Time to bring this filter out of experimental status
||googletagservices.com/tag/js/gpt.js$script,xhr,redirect=googletagservices.com/gpt.js:5
||securepubads.g.doubleclick.net/tag/js/gpt.js$script,redirect=googletagservices_gpt.js:5
||pagead2.googlesyndication.com/tag/js/gpt.js$script,redirect=googletagservices_gpt.js:5

! https://github.com/gorhill/uBlock/issues/1265
||scorecardresearch.com/beacon.js$script,redirect=scorecardresearch.com/beacon.js:5

! https://github.com/uBlockOrigin/uAssets/issues/7
||google-analytics.com/ga.js$script,redirect=google-analytics.com/ga.js:5

! https://www.eff.org/deeplinks/2014/07/white-house-website-includes-unique-non-cookie-tracker-despite-privacy-policy
! https://github.com/uBlockOrigin/uAssets/issues/1713
! https://github.com/uBlockOrigin/uAssets/issues/6319
! https://github.com/gorhill/uBlock/issues/1384
! https://github.com/uBlockOrigin/uAssets/issues/11003
||addthis.com/*/addthis_widget.js$script
##.addthis_toolbox

! Examples of what is fixed by even an unfilled dummy API:
! https://twitter.com/kenn_butler/status/709163241021317120
! https://adblockplus.org/forum/viewtopic.php?f=10&t=48183
! https://forums.lanik.us/viewtopic.php?f=64&t=32161
! https://forums.lanik.us/viewtopic.php?f=64&t=30670
||googletagmanager.com/gtm.js$script,redirect=googletagmanager_gtm.js:5

! https://github.com/gorhill/uBlock/issues/1082
! https://github.com/gorhill/uBlock/issues/1250#issuecomment-173533894
! https://github.com/gorhill/uBlock/issues/2155
||widgets.outbrain.com/outbrain.js$script,redirect=outbrain-widget.js:5,domain=~vice.com

! https://github.com/uBlockOrigin/uAssets/issues/713
||google-analytics.com/analytics.js$important,script,redirect=google-analytics.com/analytics.js,domain=support.amd.com
||googletagmanager.com/gtm.js$important,script,redirect=googletagmanager.com/gtm.js,domain=support.amd.com

! https://github.com/uBlockOrigin/uAssets/issues/4138
rediff.com##a[onclick^="trackURL"]:remove-attr(onclick)
rediff.com##a[onmousedown^="return enc(this,'https://track.rediff.com"]:remove-attr(onmousedown)

! https://www.reddit.com/r/uBlockOrigin/comments/b9qsix/new_reddit_tracks_a_ton_more_data_someone_said/
! https://github.com/uBlockOrigin/uAssets/commit/5563840a319a26025290e17f4e9401b201ac2b99#commitcomment-118042265
||reddit.com/api/jail^$xhr,1p
! https://www.reddit.com/r/uBlockOrigin/comments/tihpyw/oldredditcom_outbound_tracking_via_out_reddit_com/i1f290z/?context=3
old.reddit.com##a.outbound[data-outbound-url]:remove-attr(data-outbound-url)
!reddit.com##+js(set, Object.prototype.allowClickTracking, false)
! https://www.reddit.com/r/worldnews/
! https://github.com/uBlockOrigin/uAssets/issues/18938
www.reddit.com##+js(json-prune, data.*.elements.edges.[].node.outboundLink)
www.reddit.com##+js(json-prune, data.children.[].data.outbound_link)
||redditstatic.com/shreddit/sentry-$domain=reddit.com
||www.reddit.com/|$xhr,1p,method=post
||reddit.com^$doc,removeparam=/web_only=/
||reddit.com^$doc,removeparam=/deep_link=/
||reddit.com^$doc,removeparam=correlation_id
||reddit.com^$doc,removeparam=ref
||reddit.com^$doc,removeparam=ref_campaign
||reddit.com^$doc,removeparam=ref_source
||reddit.com^$doc,removeparam=utm_content
! https://github.com/uBlockOrigin/uBlock-issues/issues/3206#issuecomment-2406041484
||click.redditmail.com/CL0/$urlskip=/\/CL0\/(http.*?)\/\d\/[a-f0-9-]+\// -uricomponent
! remove.bg
||rd.remove.bg/CL0/http$doc,urlskip=/\/CL0\/(http.*?)\/\d\/[a-f0-9-]+\// -uricomponent

! https://github.com/uBlockOrigin/uAssets/pull/5997
docs.google.com##+js(no-xhr-if, method:POST url:/logImpressions)
! https://github.com/uBlockOrigin/uAssets/issues/7960
www.google.*##+js(set, rwt, noopFunc)
! https://github.com/uBlockOrigin/uAssets/issues/7960#issuecomment-2018914258
!#if !env_mobile
www.google.*###main a[href][data-sb^="/url?"]:remove-attr(data-sb)
!#else
www.google.*##+js(href-sanitizer, #main a[href^="/url?q=http"], ?q)
www.google.*###main a[href][ping^="/url?"]:remove-attr(ping)
!#endif
! https://www.reddit.com/r/uBlockOrigin/comments/1eppef9/is_it_possible_to_hide_googles_annoying_redirect/
www.google.*##+js(set-attr, c-wiz[data-p] [data-query] a[target="_blank"][role="link"], rlhc, 1)

! https://github.com/uBlockOrigin/uAssets/issues/6538
liberation.fr,officedepot.fr,oui.sncf##+js(acs, document.createElement, '.js')
sfr.fr##+js(aopr, _oEa)

! https://github.com/uBlockOrigin/uBlock-issues/issues/780#issuecomment-558734257
brillen.de##+js(acs, document.createElement, 'script')
||marketing.net.*^$1p

! https://github.com/uBlockOrigin/uAssets/issues/7118
||vidtech.cbsinteractive.com^*/tracking/$script,redirect=noop.js,important

! https://github.com/uBlockOrigin/uAssets/issues/7178
!#if env_chromium
||carsensor.net/usedcar/modules/clicklog_$xhr,1p,important,redirect=noop.txt
!#endif

! https://github.com/uBlockOrigin/uAssets/issues/478#issuecomment-612229916
/analytics/analytics.$~xmlhttprequest,3p
/ga_setup.js$3p
/googleanalytics.js$3p
! https://github.com/uBlockOrigin/uAssets/issues/11262
-google-analytics/$domain=~wordpress.org,badfilter
-google-analytics/$3p,domain=~wordpress.org|~brookson.co.uk

! https://github.com/uBlockOrigin/uAssets/pull/4961
||the-japan-news.com/modules/js/lib/fgp/fingerprint2.js$script,redirect=fingerprint2.js,important

! https://github.com/AdguardTeam/AdguardFilters/issues/57295
||mtsa.com.my/mtcs.php/pageview/track^$image

! https://github.com/AdguardTeam/AdguardFilters/issues/57325
||api.tumblr.com/*/share/stats$script,3p

! https://github.com/uBlockOrigin/uAssets/issues/7833
frogogo.ru##+js(aopw, ADMITAD)
||artfut.com/static/tagtag.$script,3p,redirect=noop.js

! https://github.com/uBlockOrigin/uAssets/issues/8105
! block known tracking honeypots
||copyhomework.com^
||coursecopy.com^
||quiztoolbox.com^
||quizlookup.com^
||studyeffect.com^
||testbooksolutions.com^

! https://github.com/uBlockOrigin/uBlock-issues/issues/1388
@@||googletagmanager.com/gtm.js$script,redirect-rule,domain=rocketnews24.com

! https://github.com/uBlockOrigin/uAssets/commit/ee5aec09e45376b7e6fb50ff56cb54425826df0d#commitcomment-44879744
/stats.php?*event=$image

! beastpics.club etc.
/check.php?t=*&rand=$image,1p

! https://github.com/easylist/easylist/issues/6724
/jquery.js?*&rx=*&foxtail=$image,1p
||jsdelivr.net/npm/skx@*/optical.js

! hd21 group sites analytics
/counter/?domain=$image,1p
||hd21.com/ajax/track?

! drtuber.desi analytics
||drtuber.*/ajax/track?track_type=

! dekki.com analytics
||playbrain.io/analytics/

! https://github.com/AdguardTeam/AdguardFilters/issues/80625
tweakers.net##+js(aost, btoa, send)

! https://github.com/AdguardTeam/AdguardFilters/issues/81533
||yuktamedia.com^$3p

! https://github.com/AdguardTeam/AdguardFilters/issues/81778
||gamedock.io^$3p

! https://github.com/AdguardTeam/AdguardFilters/issues/75098
||stats.webgames.io^

! https://github.com/uBlockOrigin/uAssets/issues/9273
||blogfoster.com^$3p

! mettablog.com
||myanalytic.net^$3p

! simply-hentai.com beacon
||t.simply-hentai.com^

! https://search.brave.com/search?q=Chromium
search.brave.com##+js(no-fetch-if, body:browser)

! https://github.com/uBlockOrigin/uAssets/pull/9472
||d3bch4rrbnbe5n.cloudfront.net/pxl.png^

! https://github.com/uBlockOrigin/uAssets/issues/9123
/visilabs.min.js

! https://github.com/orgs/uBlockOrigin/teams/ublock-filters-volunteers/discussions/354
||civicscience.com^$3p

! https://github.com/uBlockOrigin/uAssets/issues/9932
/\/[a-z0-9]{12}\/[a-zA-Z0-9\/\+\-]{97,106}$/$match-case,script,1p,strict1p
/^https?:\/\/(?!assets|script|static)(?:[0-9a-z]{10,13}|[0-9a-z]{6})\.[0-9A-Za-z.\-_]+\/(?=[0-9a-z+\/\-]*[A-Z])[0-9A-Za-z+\/\-]{80,106}$/$script,1p,match-case,strict3p
/dataunlocker$script,1p,domain=~dataunlocker.com
||admin-2.dataunlocker.com^$~script
||dataunlocker.com/api/$~script,1p
||data-saver-cindi.herokuapp.com^
||franchiseplus.nl^$csp=script-src * 'unsafe-inline' 'wasm-unsafe-eval' data: blob: mediastream: filesystem:
||nikitaeverywhere.com^$script,xhr,1p
@@||nikitaeverywhere.com/static/js/main-*.js|$script,1p
@@||nikitaeverywhere.com/nikitaeverywhere-com-content/data.json|$xhr,1p
!#if cap_html_filtering
botcomics.com,cefirates.com,chandlerorchards.com,comicleaks.com,marketdata.app,monumentmetals.com,tapmyback.com,ping.gg,revistaferramental.com.br,hawpar.com,alpacafinance.org,nookgaming.com,enkeleksamen.no,kvest.ee,creatordrop.com,panpots.com,cybernetman.com,bitdomain.biz,gerardbosch.xyz,fort-shop.kiev.ua,accuretawealth.com,resourceya.com,tracktheta.com,adaptive.marketing,camberlion.com,replai.io,trybawaryjny.pl,segops.madisonspecs.com,stresshelden-coaching.de,controlconceptsusa.com,ryaktive.com,tip.etip-staging.etip.io##^script:has-text("join('')")
alpacafinance.org,tt.live,future-fortune.com,furucombo.app,adventuretix.com,bolighub.dk##^script:has-text('join("")')
panprices.com,intercity.technology,freelancer.taxmachine.be,kodalia.com,adria.gg,fjlaboratories.com,emanualonline.com,abhijith.page,helpmonks.com##^script:has-text(api.dataunlocker.com)
||eldorado.gg/main.$script,1p,replace=/"\}\,[a-zA-Z]+:\{scriptName:".*?_data_[a-z0-9]{2,20}"},/"},/
trybawaryjny.pl##^script[src^="data:text/javascript;base64,CiAgRnVuY"]
dataunlocker.com##^script:has-text(/^Function\(\"/)
!#else
botcomics.com,cefirates.com,chandlerorchards.com,comicleaks.com,marketdata.app,monumentmetals.com,tapmyback.com,ping.gg,revistaferramental.com.br,hawpar.com,alpacafinance.org,nookgaming.com,enkeleksamen.no,kvest.ee,creatordrop.com,panpots.com,cybernetman.com,bitdomain.biz,gerardbosch.xyz,fort-shop.kiev.ua,accuretawealth.com,resourceya.com,tracktheta.com,camberlion.com,replai.io,trybawaryjny.pl,segops.madisonspecs.com,stresshelden-coaching.de,controlconceptsusa.com,ryaktive.com,tip.etip-staging.etip.io##+js(rmnt, script, /join\(\'\'\)/)
alpacafinance.org,tt.live,future-fortune.com,adventuretix.com,bolighub.dk##+js(rmnt, script, /join\(\"\"\)/)
panprices.com,intercity.technology,freelancer.taxmachine.be,adria.gg,fjlaboratories.com,emanualonline.com,abhijith.page,helpmonks.com##+js(rmnt, script, api.dataunlocker.com)
||trybawaryjny.pl^$csp=script-src * 'unsafe-inline' 'wasm-unsafe-eval' data: blob: mediastream: filesystem:
dataunlocker.com##+js(rmnt, script, /^Function\(\"/)
!#endif

! https://www.reddit.com/r/uBlockOrigin/comments/opoba7/washington_post_showing_ad_placeholders/
||washpost.nile.works^

! https://github.com/easylist/easylist/commit/6457d9a221b19bf6d011d314d0bf14476d18f428#commitcomment-54257940
/p13n/batch/action/*$image

! Ad-Shield
! https://github.com/uBlockOrigin/uAssets/issues/9717
/^https:\/\/cdn\.jsdelivr\.net\/npm\/[-a-z_]{4,22}@latest\/dist\/script\.min\.js$/$script,3p,match-case
aikatu.jp,aniroleplay.com,ap7am.com,autoby.jp,autofrage.net,automobile-catalog.com,badmouth1.com,bamgosu.site,bg-mania.jp,bleepingcomputer.com,blogmura.com,buzzfeed.com,buzzfeednews.com,chanto.jp.net,cinema.com.my,cinetrafic.fr,cocokara-next.com,computerfrage.net,convertcase.net,cool-style.com.tw,crosswordsolver.com,cruciverba.it,daily.co.jp,dnevno.hr,dogdrip.net,dolldivine.com,donbalon.com,dramabeans.com,dropgame.jp,dziennik.pl,economictimes.com,economist.co.kr,edaily.co.kr,etnews.com,etoday.co.kr,etoland.co.kr,eurointegration.com.ua,flatpanelshd.com,fntimes.com,forsal.pl,freemcserver.net,gazetaprawna.pl,gazetaprawna.pl,giornalone.it,globalrph.com,gloria.hr,golf-live.at,heureka.cz,hometownstation.com,honkailab.com,horairesdouverture24.fr,infinityfree.com,iplocation.net,islamicfinder.org,isplus.com,issuya.com,iusm.co.kr,j-cast.com,j-town.net,jablickar.cz,jamaicaobserver.com,javatpoint.com,jawapos.com,jmty.jp,joemonster.org,jutarnji.hr,kinmaweb.jp,knowt.com,kompasiana.com,kreuzwortraetsel.de,kurashiru.com,kyoteibiyori.com,lacuarta.com,laleggepertutti.it,lamire.jp,lifehacker.jp,livenewschat.eu,loawa.com,logicieleducatif.fr,lovelive-petitsoku.com,maketecheasier.com,malaymail.com,mamastar.jp,manta.com,mariowiki.com,mediaindonesia.com,minkou.jp,mirrored.to,missyusa.com,mistrzowie.org,mlbpark.donga.com,motherlyvisions.com,motscroises.fr,motscroises.fr,mydaily.co.kr,mynet.com,nana-press.com,netzwelt.de,nmplus.hk,nyitvatartas24.hu,oeffnungszeitenbuch.de,ondemandkorea.com,oradesibiu.ro,oraridiapertura24.it,palabr.as,palabr.as,persoenlich.com,petitfute.com,picrew.me,powerpyx.com,pravda.com.ua,pressian.com,quefaire.be,raenonx.cc,raetsel-hilfe.de,relevantmagazine.com,reportera.co.kr,roleplayer.me,rostercon.com,samsungmagazine.eu,slashdot.org,slobodnadalmacija.hr,smsonline.cloud,sourceforge.net,sportalkorea.com,sportsrec.com,sportsseoul.com,talkwithstranger.com,text-compare.com,thatgossip.com,the-crossword-solver.com,thefreebieguy.com,thesaurus.net,thestockmarketwatch.com,tportal.hr,transparentcalifornia.com,transparentnevada.com,tvtv.ca,tvtv.us,ufret.jp,upmedia.mg,verkaufsoffener-sonntag.com,w.grapps.me,watchdocumentaries.com,webdesignledger.com,wfmz.com,winfuture.de,word-grabber.com,worldhistory.org,wort-suchen.de,wort-suchen.de,wouldurather.io,woxikon.*,ygosu.com,yutura.net,zagreb.info##+js(set-local-storage-item, adshield-analytics-uuid, $remove$)
aikatu.jp,aniroleplay.com,ap7am.com,autoby.jp,autofrage.net,automobile-catalog.com,badmouth1.com,bamgosu.site,bg-mania.jp,bleepingcomputer.com,blogmura.com,buzzfeed.com,buzzfeednews.com,chanto.jp.net,cinema.com.my,cinetrafic.fr,cocokara-next.com,computerfrage.net,convertcase.net,cool-style.com.tw,crosswordsolver.com,cruciverba.it,daily.co.jp,dnevno.hr,dogdrip.net,dolldivine.com,donbalon.com,dramabeans.com,dropgame.jp,dziennik.pl,economictimes.com,economist.co.kr,edaily.co.kr,etnews.com,etoday.co.kr,etoland.co.kr,eurointegration.com.ua,flatpanelshd.com,fntimes.com,forsal.pl,freemcserver.net,gazetaprawna.pl,gazetaprawna.pl,giornalone.it,globalrph.com,gloria.hr,golf-live.at,heureka.cz,hometownstation.com,honkailab.com,horairesdouverture24.fr,infinityfree.com,iplocation.net,islamicfinder.org,isplus.com,issuya.com,iusm.co.kr,j-cast.com,j-town.net,jablickar.cz,jamaicaobserver.com,javatpoint.com,jawapos.com,jmty.jp,joemonster.org,jutarnji.hr,kinmaweb.jp,knowt.com,kompasiana.com,kreuzwortraetsel.de,kurashiru.com,kyoteibiyori.com,lacuarta.com,laleggepertutti.it,lamire.jp,lifehacker.jp,livenewschat.eu,loawa.com,logicieleducatif.fr,lovelive-petitsoku.com,maketecheasier.com,malaymail.com,mamastar.jp,manta.com,mariowiki.com,mediaindonesia.com,minkou.jp,mirrored.to,missyusa.com,mistrzowie.org,mlbpark.donga.com,motherlyvisions.com,motscroises.fr,motscroises.fr,mydaily.co.kr,mynet.com,nana-press.com,netzwelt.de,nmplus.hk,nyitvatartas24.hu,oeffnungszeitenbuch.de,ondemandkorea.com,oradesibiu.ro,oraridiapertura24.it,palabr.as,palabr.as,persoenlich.com,petitfute.com,picrew.me,powerpyx.com,pravda.com.ua,pressian.com,quefaire.be,raenonx.cc,raetsel-hilfe.de,relevantmagazine.com,reportera.co.kr,roleplayer.me,rostercon.com,samsungmagazine.eu,slashdot.org,slobodnadalmacija.hr,smsonline.cloud,sourceforge.net,sportalkorea.com,sportsrec.com,sportsseoul.com,talkwithstranger.com,text-compare.com,thatgossip.com,the-crossword-solver.com,thefreebieguy.com,thesaurus.net,thestockmarketwatch.com,tportal.hr,transparentcalifornia.com,transparentnevada.com,tvtv.ca,tvtv.us,ufret.jp,upmedia.mg,verkaufsoffener-sonntag.com,w.grapps.me,watchdocumentaries.com,webdesignledger.com,wfmz.com,winfuture.de,word-grabber.com,worldhistory.org,wort-suchen.de,wort-suchen.de,wouldurather.io,woxikon.*,ygosu.com,yutura.net,zagreb.info##+js(set-local-storage-item, /_fa_bGFzdF9iZmFfYXQ=$/, $remove$)
aikatu.jp,aniroleplay.com,ap7am.com,autoby.jp,autofrage.net,automobile-catalog.com,badmouth1.com,bamgosu.site,bg-mania.jp,bleepingcomputer.com,blogmura.com,buzzfeed.com,buzzfeednews.com,chanto.jp.net,cinema.com.my,cinetrafic.fr,cocokara-next.com,computerfrage.net,convertcase.net,cool-style.com.tw,crosswordsolver.com,cruciverba.it,daily.co.jp,dnevno.hr,dogdrip.net,dolldivine.com,donbalon.com,dramabeans.com,dropgame.jp,dziennik.pl,economictimes.com,economist.co.kr,edaily.co.kr,etnews.com,etoday.co.kr,etoland.co.kr,eurointegration.com.ua,flatpanelshd.com,fntimes.com,forsal.pl,freemcserver.net,gazetaprawna.pl,gazetaprawna.pl,giornalone.it,globalrph.com,gloria.hr,golf-live.at,heureka.cz,hometownstation.com,honkailab.com,horairesdouverture24.fr,infinityfree.com,iplocation.net,islamicfinder.org,isplus.com,issuya.com,iusm.co.kr,j-cast.com,j-town.net,jablickar.cz,jamaicaobserver.com,javatpoint.com,jawapos.com,jmty.jp,joemonster.org,jutarnji.hr,kinmaweb.jp,knowt.com,kompasiana.com,kreuzwortraetsel.de,kurashiru.com,kyoteibiyori.com,lacuarta.com,laleggepertutti.it,lamire.jp,lifehacker.jp,livenewschat.eu,loawa.com,logicieleducatif.fr,lovelive-petitsoku.com,maketecheasier.com,malaymail.com,mamastar.jp,manta.com,mariowiki.com,mediaindonesia.com,minkou.jp,mirrored.to,missyusa.com,mistrzowie.org,mlbpark.donga.com,motherlyvisions.com,motscroises.fr,motscroises.fr,mydaily.co.kr,mynet.com,nana-press.com,netzwelt.de,nmplus.hk,nyitvatartas24.hu,oeffnungszeitenbuch.de,ondemandkorea.com,oradesibiu.ro,oraridiapertura24.it,palabr.as,palabr.as,persoenlich.com,petitfute.com,picrew.me,powerpyx.com,pravda.com.ua,pressian.com,quefaire.be,raenonx.cc,raetsel-hilfe.de,relevantmagazine.com,reportera.co.kr,roleplayer.me,rostercon.com,samsungmagazine.eu,slashdot.org,slobodnadalmacija.hr,smsonline.cloud,sourceforge.net,sportalkorea.com,sportsrec.com,sportsseoul.com,talkwithstranger.com,text-compare.com,thatgossip.com,the-crossword-solver.com,thefreebieguy.com,thesaurus.net,thestockmarketwatch.com,tportal.hr,transparentcalifornia.com,transparentnevada.com,tvtv.ca,tvtv.us,ufret.jp,upmedia.mg,verkaufsoffener-sonntag.com,w.grapps.me,watchdocumentaries.com,webdesignledger.com,wfmz.com,winfuture.de,word-grabber.com,worldhistory.org,wort-suchen.de,wort-suchen.de,wouldurather.io,woxikon.*,ygosu.com,yutura.net,zagreb.info##+js(set-local-storage-item, /_fa_dXVpZA==$/, $remove$)
aikatu.jp,aniroleplay.com,ap7am.com,autoby.jp,autofrage.net,automobile-catalog.com,badmouth1.com,bamgosu.site,bg-mania.jp,bleepingcomputer.com,blogmura.com,buzzfeed.com,buzzfeednews.com,chanto.jp.net,cinema.com.my,cinetrafic.fr,cocokara-next.com,computerfrage.net,convertcase.net,cool-style.com.tw,crosswordsolver.com,cruciverba.it,daily.co.jp,dnevno.hr,dogdrip.net,dolldivine.com,donbalon.com,dramabeans.com,dropgame.jp,dziennik.pl,economictimes.com,economist.co.kr,edaily.co.kr,etnews.com,etoday.co.kr,etoland.co.kr,eurointegration.com.ua,flatpanelshd.com,fntimes.com,forsal.pl,freemcserver.net,gazetaprawna.pl,gazetaprawna.pl,giornalone.it,globalrph.com,gloria.hr,golf-live.at,heureka.cz,hometownstation.com,honkailab.com,horairesdouverture24.fr,infinityfree.com,iplocation.net,islamicfinder.org,isplus.com,issuya.com,iusm.co.kr,j-cast.com,j-town.net,jablickar.cz,jamaicaobserver.com,javatpoint.com,jawapos.com,jmty.jp,joemonster.org,jutarnji.hr,kinmaweb.jp,knowt.com,kompasiana.com,kreuzwortraetsel.de,kurashiru.com,kyoteibiyori.com,lacuarta.com,laleggepertutti.it,lamire.jp,lifehacker.jp,livenewschat.eu,loawa.com,logicieleducatif.fr,lovelive-petitsoku.com,maketecheasier.com,malaymail.com,mamastar.jp,manta.com,mariowiki.com,mediaindonesia.com,minkou.jp,mirrored.to,missyusa.com,mistrzowie.org,mlbpark.donga.com,motherlyvisions.com,motscroises.fr,motscroises.fr,mydaily.co.kr,mynet.com,nana-press.com,netzwelt.de,nmplus.hk,nyitvatartas24.hu,oeffnungszeitenbuch.de,ondemandkorea.com,oradesibiu.ro,oraridiapertura24.it,palabr.as,palabr.as,persoenlich.com,petitfute.com,picrew.me,powerpyx.com,pravda.com.ua,pressian.com,quefaire.be,raenonx.cc,raetsel-hilfe.de,relevantmagazine.com,reportera.co.kr,roleplayer.me,rostercon.com,samsungmagazine.eu,slashdot.org,slobodnadalmacija.hr,smsonline.cloud,sourceforge.net,sportalkorea.com,sportsrec.com,sportsseoul.com,talkwithstranger.com,text-compare.com,thatgossip.com,the-crossword-solver.com,thefreebieguy.com,thesaurus.net,thestockmarketwatch.com,tportal.hr,transparentcalifornia.com,transparentnevada.com,tvtv.ca,tvtv.us,ufret.jp,upmedia.mg,verkaufsoffener-sonntag.com,w.grapps.me,watchdocumentaries.com,webdesignledger.com,wfmz.com,winfuture.de,word-grabber.com,worldhistory.org,wort-suchen.de,wort-suchen.de,wouldurather.io,woxikon.*,ygosu.com,yutura.net,zagreb.info##+js(set-local-storage-item, /_fa_Y2FjaGVfaXNfYmxvY2tpbmdfYWNjZXB0YWJsZV9hZHM=$/, $remove$)
aikatu.jp,aniroleplay.com,ap7am.com,autoby.jp,autofrage.net,automobile-catalog.com,badmouth1.com,bamgosu.site,bg-mania.jp,bleepingcomputer.com,blogmura.com,buzzfeed.com,buzzfeednews.com,chanto.jp.net,cinema.com.my,cinetrafic.fr,cocokara-next.com,computerfrage.net,convertcase.net,cool-style.com.tw,crosswordsolver.com,cruciverba.it,daily.co.jp,dnevno.hr,dogdrip.net,dolldivine.com,donbalon.com,dramabeans.com,dropgame.jp,dziennik.pl,economictimes.com,economist.co.kr,edaily.co.kr,etnews.com,etoday.co.kr,etoland.co.kr,eurointegration.com.ua,flatpanelshd.com,fntimes.com,forsal.pl,freemcserver.net,gazetaprawna.pl,gazetaprawna.pl,giornalone.it,globalrph.com,gloria.hr,golf-live.at,heureka.cz,hometownstation.com,honkailab.com,horairesdouverture24.fr,infinityfree.com,iplocation.net,islamicfinder.org,isplus.com,issuya.com,iusm.co.kr,j-cast.com,j-town.net,jablickar.cz,jamaicaobserver.com,javatpoint.com,jawapos.com,jmty.jp,joemonster.org,jutarnji.hr,kinmaweb.jp,knowt.com,kompasiana.com,kreuzwortraetsel.de,kurashiru.com,kyoteibiyori.com,lacuarta.com,laleggepertutti.it,lamire.jp,lifehacker.jp,livenewschat.eu,loawa.com,logicieleducatif.fr,lovelive-petitsoku.com,maketecheasier.com,malaymail.com,mamastar.jp,manta.com,mariowiki.com,mediaindonesia.com,minkou.jp,mirrored.to,missyusa.com,mistrzowie.org,mlbpark.donga.com,motherlyvisions.com,motscroises.fr,motscroises.fr,mydaily.co.kr,mynet.com,nana-press.com,netzwelt.de,nmplus.hk,nyitvatartas24.hu,oeffnungszeitenbuch.de,ondemandkorea.com,oradesibiu.ro,oraridiapertura24.it,palabr.as,palabr.as,persoenlich.com,petitfute.com,picrew.me,powerpyx.com,pravda.com.ua,pressian.com,quefaire.be,raenonx.cc,raetsel-hilfe.de,relevantmagazine.com,reportera.co.kr,roleplayer.me,rostercon.com,samsungmagazine.eu,slashdot.org,slobodnadalmacija.hr,smsonline.cloud,sourceforge.net,sportalkorea.com,sportsrec.com,sportsseoul.com,talkwithstranger.com,text-compare.com,thatgossip.com,the-crossword-solver.com,thefreebieguy.com,thesaurus.net,thestockmarketwatch.com,tportal.hr,transparentcalifornia.com,transparentnevada.com,tvtv.ca,tvtv.us,ufret.jp,upmedia.mg,verkaufsoffener-sonntag.com,w.grapps.me,watchdocumentaries.com,webdesignledger.com,wfmz.com,winfuture.de,word-grabber.com,worldhistory.org,wort-suchen.de,wort-suchen.de,wouldurather.io,woxikon.*,ygosu.com,yutura.net,zagreb.info##+js(set-local-storage-item, /_fa_Y2FjaGVfaXNfYmxvY2tpbmdfYWRz$/, $remove$)
aikatu.jp,aniroleplay.com,ap7am.com,autoby.jp,autofrage.net,automobile-catalog.com,badmouth1.com,bamgosu.site,bg-mania.jp,bleepingcomputer.com,blogmura.com,buzzfeed.com,buzzfeednews.com,chanto.jp.net,cinema.com.my,cinetrafic.fr,cocokara-next.com,computerfrage.net,convertcase.net,cool-style.com.tw,crosswordsolver.com,cruciverba.it,daily.co.jp,dnevno.hr,dogdrip.net,dolldivine.com,donbalon.com,dramabeans.com,dropgame.jp,dziennik.pl,economictimes.com,economist.co.kr,edaily.co.kr,etnews.com,etoday.co.kr,etoland.co.kr,eurointegration.com.ua,flatpanelshd.com,fntimes.com,forsal.pl,freemcserver.net,gazetaprawna.pl,gazetaprawna.pl,giornalone.it,globalrph.com,gloria.hr,golf-live.at,heureka.cz,hometownstation.com,honkailab.com,horairesdouverture24.fr,infinityfree.com,iplocation.net,islamicfinder.org,isplus.com,issuya.com,iusm.co.kr,j-cast.com,j-town.net,jablickar.cz,jamaicaobserver.com,javatpoint.com,jawapos.com,jmty.jp,joemonster.org,jutarnji.hr,kinmaweb.jp,knowt.com,kompasiana.com,kreuzwortraetsel.de,kurashiru.com,kyoteibiyori.com,lacuarta.com,laleggepertutti.it,lamire.jp,lifehacker.jp,livenewschat.eu,loawa.com,logicieleducatif.fr,lovelive-petitsoku.com,maketecheasier.com,malaymail.com,mamastar.jp,manta.com,mariowiki.com,mediaindonesia.com,minkou.jp,mirrored.to,missyusa.com,mistrzowie.org,mlbpark.donga.com,motherlyvisions.com,motscroises.fr,motscroises.fr,mydaily.co.kr,mynet.com,nana-press.com,netzwelt.de,nmplus.hk,nyitvatartas24.hu,oeffnungszeitenbuch.de,ondemandkorea.com,oradesibiu.ro,oraridiapertura24.it,palabr.as,palabr.as,persoenlich.com,petitfute.com,picrew.me,powerpyx.com,pravda.com.ua,pressian.com,quefaire.be,raenonx.cc,raetsel-hilfe.de,relevantmagazine.com,reportera.co.kr,roleplayer.me,rostercon.com,samsungmagazine.eu,slashdot.org,slobodnadalmacija.hr,smsonline.cloud,sourceforge.net,sportalkorea.com,sportsrec.com,sportsseoul.com,talkwithstranger.com,text-compare.com,thatgossip.com,the-crossword-solver.com,thefreebieguy.com,thesaurus.net,thestockmarketwatch.com,tportal.hr,transparentcalifornia.com,transparentnevada.com,tvtv.ca,tvtv.us,ufret.jp,upmedia.mg,verkaufsoffener-sonntag.com,w.grapps.me,watchdocumentaries.com,webdesignledger.com,wfmz.com,winfuture.de,word-grabber.com,worldhistory.org,wort-suchen.de,wort-suchen.de,wouldurather.io,woxikon.*,ygosu.com,yutura.net,zagreb.info##+js(set-local-storage-item, /_fa_Y2FjaGVfYWRibG9ja19jaXJjdW12ZW50X3Njb3Jl$/, $remove$)
! livedoor-sites
2chblog.jp,2monkeys.jp,46matome.net,akb48glabo.com,akb48matomemory.com,alfalfalfa.com,all-nationz.com,anihatsu.com,aqua2ch.net,blog.esuteru.com,blog.livedoor.jp,blog.jp,blogo.jp,chaos2ch.com,choco0202.work,crx7601.com,danseisama.com,dareda.net,digital-thread.com,doorblog.jp,exawarosu.net,fgochaldeas.com,football-2ch.com,gekiyaku.com,golog.jp,hacchaka.net,heartlife-matome.com,liblo.jp,fesoku.net,fiveslot777.com,gamejksokuhou.com,girlsreport.net,girlsvip-matome.com,grasoku.com,gundamlog.com,honyaku-channel.net,ikarishintou.com,imas-cg.net,imihu.net,inutomo11.com,itainews.com,itaishinja.com,jin115.com,jisaka.com,jnews1.com,jumpsokuhou.com,jyoseisama.com,keyakizaka46matomemory.net,kidan-m.com,kijoden.com,kijolariat.net,kijolifehack.com,kijomatomelog.com,kijyokatu.com,kijyomatome.com,kijyomatome-ch.com,kijyomita.com,kirarafan.com,kitimama-matome.net,kitizawa.com,konoyubitomare.jp,kotaro269.com,kyousoku.net,ldblog.jp,livedoor.biz,livedoor.blog,majikichi.com,matacoco.com,matomeblade.com,matomelotte.com,matometemitatta.com,mojomojo-licarca.com,morikinoko.com,nandemo-uketori.com,netatama.net,news-buzz1.com,news30over.com,nmb48-mtm.com,norisoku.com,npb-news.com,ocsoku.com,okusama-kijyo.com,onihimechan.com,orusoku.com,otakomu.jp,otoko-honne.com,oumaga-times.com,outdoormatome.com,pachinkopachisro.com,paranormal-ch.com,recosoku.com,s2-log.com,saikyo-jump.com,shuraba-matome.com,ske48matome.net,squallchannel.com,sukattojapan.com,sumaburayasan.com,usi32.com,uwakich.com,uwakitaiken.com,vault76.info,vipnews.jp,vippers.jp,vipsister23.com,vtubernews.jp,watarukiti.com,world-fusigi.net,zakuzaku911.com,zch-vip.com##+js(set-local-storage-item, adshield-analytics-uuid, $remove$)
2chblog.jp,2monkeys.jp,46matome.net,akb48glabo.com,akb48matomemory.com,alfalfalfa.com,all-nationz.com,anihatsu.com,aqua2ch.net,blog.esuteru.com,blog.livedoor.jp,blog.jp,blogo.jp,chaos2ch.com,choco0202.work,crx7601.com,danseisama.com,dareda.net,digital-thread.com,doorblog.jp,exawarosu.net,fgochaldeas.com,football-2ch.com,gekiyaku.com,golog.jp,hacchaka.net,heartlife-matome.com,liblo.jp,fesoku.net,fiveslot777.com,gamejksokuhou.com,girlsreport.net,girlsvip-matome.com,grasoku.com,gundamlog.com,honyaku-channel.net,ikarishintou.com,imas-cg.net,imihu.net,inutomo11.com,itainews.com,itaishinja.com,jin115.com,jisaka.com,jnews1.com,jumpsokuhou.com,jyoseisama.com,keyakizaka46matomemory.net,kidan-m.com,kijoden.com,kijolariat.net,kijolifehack.com,kijomatomelog.com,kijyokatu.com,kijyomatome.com,kijyomatome-ch.com,kijyomita.com,kirarafan.com,kitimama-matome.net,kitizawa.com,konoyubitomare.jp,kotaro269.com,kyousoku.net,ldblog.jp,livedoor.biz,livedoor.blog,majikichi.com,matacoco.com,matomeblade.com,matomelotte.com,matometemitatta.com,mojomojo-licarca.com,morikinoko.com,nandemo-uketori.com,netatama.net,news-buzz1.com,news30over.com,nmb48-mtm.com,norisoku.com,npb-news.com,ocsoku.com,okusama-kijyo.com,onihimechan.com,orusoku.com,otakomu.jp,otoko-honne.com,oumaga-times.com,outdoormatome.com,pachinkopachisro.com,paranormal-ch.com,recosoku.com,s2-log.com,saikyo-jump.com,shuraba-matome.com,ske48matome.net,squallchannel.com,sukattojapan.com,sumaburayasan.com,usi32.com,uwakich.com,uwakitaiken.com,vault76.info,vipnews.jp,vippers.jp,vipsister23.com,vtubernews.jp,watarukiti.com,world-fusigi.net,zakuzaku911.com,zch-vip.com##+js(set-local-storage-item, /_fa_bGFzdF9iZmFfYXQ=$/, $remove$)
2chblog.jp,2monkeys.jp,46matome.net,akb48glabo.com,akb48matomemory.com,alfalfalfa.com,all-nationz.com,anihatsu.com,aqua2ch.net,blog.esuteru.com,blog.livedoor.jp,blog.jp,blogo.jp,chaos2ch.com,choco0202.work,crx7601.com,danseisama.com,dareda.net,digital-thread.com,doorblog.jp,exawarosu.net,fgochaldeas.com,football-2ch.com,gekiyaku.com,golog.jp,hacchaka.net,heartlife-matome.com,liblo.jp,fesoku.net,fiveslot777.com,gamejksokuhou.com,girlsreport.net,girlsvip-matome.com,grasoku.com,gundamlog.com,honyaku-channel.net,ikarishintou.com,imas-cg.net,imihu.net,inutomo11.com,itainews.com,itaishinja.com,jin115.com,jisaka.com,jnews1.com,jumpsokuhou.com,jyoseisama.com,keyakizaka46matomemory.net,kidan-m.com,kijoden.com,kijolariat.net,kijolifehack.com,kijomatomelog.com,kijyokatu.com,kijyomatome.com,kijyomatome-ch.com,kijyomita.com,kirarafan.com,kitimama-matome.net,kitizawa.com,konoyubitomare.jp,kotaro269.com,kyousoku.net,ldblog.jp,livedoor.biz,livedoor.blog,majikichi.com,matacoco.com,matomeblade.com,matomelotte.com,matometemitatta.com,mojomojo-licarca.com,morikinoko.com,nandemo-uketori.com,netatama.net,news-buzz1.com,news30over.com,nmb48-mtm.com,norisoku.com,npb-news.com,ocsoku.com,okusama-kijyo.com,onihimechan.com,orusoku.com,otakomu.jp,otoko-honne.com,oumaga-times.com,outdoormatome.com,pachinkopachisro.com,paranormal-ch.com,recosoku.com,s2-log.com,saikyo-jump.com,shuraba-matome.com,ske48matome.net,squallchannel.com,sukattojapan.com,sumaburayasan.com,usi32.com,uwakich.com,uwakitaiken.com,vault76.info,vipnews.jp,vippers.jp,vipsister23.com,vtubernews.jp,watarukiti.com,world-fusigi.net,zakuzaku911.com,zch-vip.com##+js(set-local-storage-item, /_fa_dXVpZA==$/, $remove$)
2chblog.jp,2monkeys.jp,46matome.net,akb48glabo.com,akb48matomemory.com,alfalfalfa.com,all-nationz.com,anihatsu.com,aqua2ch.net,blog.esuteru.com,blog.livedoor.jp,blog.jp,blogo.jp,chaos2ch.com,choco0202.work,crx7601.com,danseisama.com,dareda.net,digital-thread.com,doorblog.jp,exawarosu.net,fgochaldeas.com,football-2ch.com,gekiyaku.com,golog.jp,hacchaka.net,heartlife-matome.com,liblo.jp,fesoku.net,fiveslot777.com,gamejksokuhou.com,girlsreport.net,girlsvip-matome.com,grasoku.com,gundamlog.com,honyaku-channel.net,ikarishintou.com,imas-cg.net,imihu.net,inutomo11.com,itainews.com,itaishinja.com,jin115.com,jisaka.com,jnews1.com,jumpsokuhou.com,jyoseisama.com,keyakizaka46matomemory.net,kidan-m.com,kijoden.com,kijolariat.net,kijolifehack.com,kijomatomelog.com,kijyokatu.com,kijyomatome.com,kijyomatome-ch.com,kijyomita.com,kirarafan.com,kitimama-matome.net,kitizawa.com,konoyubitomare.jp,kotaro269.com,kyousoku.net,ldblog.jp,livedoor.biz,livedoor.blog,majikichi.com,matacoco.com,matomeblade.com,matomelotte.com,matometemitatta.com,mojomojo-licarca.com,morikinoko.com,nandemo-uketori.com,netatama.net,news-buzz1.com,news30over.com,nmb48-mtm.com,norisoku.com,npb-news.com,ocsoku.com,okusama-kijyo.com,onihimechan.com,orusoku.com,otakomu.jp,otoko-honne.com,oumaga-times.com,outdoormatome.com,pachinkopachisro.com,paranormal-ch.com,recosoku.com,s2-log.com,saikyo-jump.com,shuraba-matome.com,ske48matome.net,squallchannel.com,sukattojapan.com,sumaburayasan.com,usi32.com,uwakich.com,uwakitaiken.com,vault76.info,vipnews.jp,vippers.jp,vipsister23.com,vtubernews.jp,watarukiti.com,world-fusigi.net,zakuzaku911.com,zch-vip.com##+js(set-local-storage-item, /_fa_Y2FjaGVfaXNfYmxvY2tpbmdfYWNjZXB0YWJsZV9hZHM=$/, $remove$)
2chblog.jp,2monkeys.jp,46matome.net,akb48glabo.com,akb48matomemory.com,alfalfalfa.com,all-nationz.com,anihatsu.com,aqua2ch.net,blog.esuteru.com,blog.livedoor.jp,blog.jp,blogo.jp,chaos2ch.com,choco0202.work,crx7601.com,danseisama.com,dareda.net,digital-thread.com,doorblog.jp,exawarosu.net,fgochaldeas.com,football-2ch.com,gekiyaku.com,golog.jp,hacchaka.net,heartlife-matome.com,liblo.jp,fesoku.net,fiveslot777.com,gamejksokuhou.com,girlsreport.net,girlsvip-matome.com,grasoku.com,gundamlog.com,honyaku-channel.net,ikarishintou.com,imas-cg.net,imihu.net,inutomo11.com,itainews.com,itaishinja.com,jin115.com,jisaka.com,jnews1.com,jumpsokuhou.com,jyoseisama.com,keyakizaka46matomemory.net,kidan-m.com,kijoden.com,kijolariat.net,kijolifehack.com,kijomatomelog.com,kijyokatu.com,kijyomatome.com,kijyomatome-ch.com,kijyomita.com,kirarafan.com,kitimama-matome.net,kitizawa.com,konoyubitomare.jp,kotaro269.com,kyousoku.net,ldblog.jp,livedoor.biz,livedoor.blog,majikichi.com,matacoco.com,matomeblade.com,matomelotte.com,matometemitatta.com,mojomojo-licarca.com,morikinoko.com,nandemo-uketori.com,netatama.net,news-buzz1.com,news30over.com,nmb48-mtm.com,norisoku.com,npb-news.com,ocsoku.com,okusama-kijyo.com,onihimechan.com,orusoku.com,otakomu.jp,otoko-honne.com,oumaga-times.com,outdoormatome.com,pachinkopachisro.com,paranormal-ch.com,recosoku.com,s2-log.com,saikyo-jump.com,shuraba-matome.com,ske48matome.net,squallchannel.com,sukattojapan.com,sumaburayasan.com,usi32.com,uwakich.com,uwakitaiken.com,vault76.info,vipnews.jp,vippers.jp,vipsister23.com,vtubernews.jp,watarukiti.com,world-fusigi.net,zakuzaku911.com,zch-vip.com##+js(set-local-storage-item, /_fa_Y2FjaGVfaXNfYmxvY2tpbmdfYWRz$/, $remove$)
2chblog.jp,2monkeys.jp,46matome.net,akb48glabo.com,akb48matomemory.com,alfalfalfa.com,all-nationz.com,anihatsu.com,aqua2ch.net,blog.esuteru.com,blog.livedoor.jp,blog.jp,blogo.jp,chaos2ch.com,choco0202.work,crx7601.com,danseisama.com,dareda.net,digital-thread.com,doorblog.jp,exawarosu.net,fgochaldeas.com,football-2ch.com,gekiyaku.com,golog.jp,hacchaka.net,heartlife-matome.com,liblo.jp,fesoku.net,fiveslot777.com,gamejksokuhou.com,girlsreport.net,girlsvip-matome.com,grasoku.com,gundamlog.com,honyaku-channel.net,ikarishintou.com,imas-cg.net,imihu.net,inutomo11.com,itainews.com,itaishinja.com,jin115.com,jisaka.com,jnews1.com,jumpsokuhou.com,jyoseisama.com,keyakizaka46matomemory.net,kidan-m.com,kijoden.com,kijolariat.net,kijolifehack.com,kijomatomelog.com,kijyokatu.com,kijyomatome.com,kijyomatome-ch.com,kijyomita.com,kirarafan.com,kitimama-matome.net,kitizawa.com,konoyubitomare.jp,kotaro269.com,kyousoku.net,ldblog.jp,livedoor.biz,livedoor.blog,majikichi.com,matacoco.com,matomeblade.com,matomelotte.com,matometemitatta.com,mojomojo-licarca.com,morikinoko.com,nandemo-uketori.com,netatama.net,news-buzz1.com,news30over.com,nmb48-mtm.com,norisoku.com,npb-news.com,ocsoku.com,okusama-kijyo.com,onihimechan.com,orusoku.com,otakomu.jp,otoko-honne.com,oumaga-times.com,outdoormatome.com,pachinkopachisro.com,paranormal-ch.com,recosoku.com,s2-log.com,saikyo-jump.com,shuraba-matome.com,ske48matome.net,squallchannel.com,sukattojapan.com,sumaburayasan.com,usi32.com,uwakich.com,uwakitaiken.com,vault76.info,vipnews.jp,vippers.jp,vipsister23.com,vtubernews.jp,watarukiti.com,world-fusigi.net,zakuzaku911.com,zch-vip.com##+js(set-local-storage-item, /_fa_Y2FjaGVfYWRibG9ja19jaXJjdW12ZW50X3Njb3Jl$/, $remove$)
meconomynews.com,brandbrief.co.kr,motorgraph.com,topstarnews.net##+js(noeval-if, /07c225f3\.online|content-loader\.com|css-load\.com|html-load\.com/)
||html-load.com^$domain=manta.com|tportal.hr|tvtropes.org|wouldurather.io|convertcase.net|zeta-ai.io
!#if cap_html_filtering
meconomynews.com,brandbrief.co.kr,motorgraph.com##^script:has-text(KCgpPT57bGV0IGU)
topstarnews.net,islamicfinder.org,secure-signup.net,dramabeans.com,dropgame.jp,manta.com,tportal.hr,tvtropes.org,wouldurather.io,convertcase.net##^script:has-text(error-report.com)
aikatu.jp,ark-unity.com,cool-style.com.tw,doanhnghiepvn.vn,mynet.com##^script[onload*="error-report.com"]
!#else
meconomynews.com,brandbrief.co.kr,motorgraph.com##+js(rmnt, script, KCgpPT57bGV0IGU)
topstarnews.net,islamicfinder.org,secure-signup.net,dramabeans.com,dropgame.jp,manta.com,tportal.hr,tvtropes.org,wouldurather.io,convertcase.net##+js(rmnt, script, error-report.com)
||html-load.com^$redirect=noopjs,domain=aikatu.jp|ark-unity.com|cool-style.com.tw|doanhnghiepvn.vn|mynet.com
aikatu.jp,ark-unity.com,cool-style.com.tw,doanhnghiepvn.vn,mynet.com##+js(nostif, error-report.com)
!#endif

! https://github.com/AdguardTeam/AdguardFilters/issues/91230
||nsfw.xxx/vendor/fingerprint/fingerprint2.min.js$script,redirect=fingerprint2.js,important

! https://www.reddit.com/r/uBlockOrigin/comments/p9lity/how_to_block_favicon_popups_on_these_websites/
||g.jwpsrv.com/g/gcid-*?notrack$frame

! https://github.com/uBlockOrigin/uAssets/issues/10012
tacobell.com##+js(set, bmak.js_post, false)

! https://github.com/easylist/easylist/pull/9136
||cloudflare.com/ajax/libs/fingerprintjs2/$script,redirect=fingerprint2.js,important,domain=gamebox.gesoten.com

! https://github.com/easylist/easylist/pull/9137
||gamerch.com/s3-assets/library/js/fingerprint2.min.js$script,redirect=fingerprint2.js,important

! https://github.com/AdguardTeam/AdguardFilters/issues/95660
||ahentai.top/counter.php
||caitlin.top/counter.php

! https://github.com/easylist/easylist/pull/9370
||tr.jianshu.com^

! https://github.com/easylist/easylist/pull/9469#issuecomment-950179366
/lib/f_ad_code.js

! https://github.com/Yuki2718/adblock/issues/40
! https://github.com/Yuki2718/adblock/issues/44
! https://www.reddit.com/r/uBlockOrigin/comments/udaxzt/block_fingerprinting_javascript_with_completely/i8xaru3/
/\.com\/[-_0-9a-zA-Z]{4,}\/[-\/_0-9a-zA-Z]{25,}$/$script,1p,domain=gu-global.com|uniqlo.com

! https://www.reddit.com/r/uBlockOrigin/comments/r06yju/sur_in_english_website_recognises_ad_blocker/
||metrics.surinenglish.com^

! https://github.com/uBlockOrigin/uAssets/issues/10615#issuecomment-980221624
@@||natureetdecouvertes.com^*/pixel.png$~third-party,badfilter

! https://github.com/uBlockOrigin/uAssets/issues/10630
||cm.bilibili.com/cm/api/$xhr

! https://github.com/uBlockOrigin/uAssets/issues/10679
||wannads.com/api/track/fingerprint^

! https://github.com/uBlockOrigin/uAssets/issues/10690
||wuzhuiso.com^$removeparam=src

! https://github.com/uBlockOrigin/uAssets/pull/10610
||va.huya.com^
||e-stat.huya.com^

! pornocolombiano.net analytics
||analytics.tiendaenoferta.com^

! https://github.com/uBlockOrigin/uAssets/issues/10995
||zhihu.com^$removeparam=hybrid_search_source
||zhihu.com^$removeparam=hybrid_search_extra

! https://github.com/easylist/easylist/issues/6724#issuecomment-1003172754
! https://github.com/uBlockOrigin/uAssets/pull/15692#issuecomment-1321098072
/cfga/jquery.js?$image

! https://github.com/uBlockOrigin/uAssets/issues/11278
||mynewsmedia.co/*/Linkpage/ads_stats_controller.php
||gplinks.co/Auth/ads_stats_controller.php

! https://github.com/uBlockOrigin/uAssets/issues/9970
||videovard.*/api/front/view^$xhr,important

! https://github.com/uBlockOrigin/uAssets/issues/11644
endbasic.dev,jmmv.dev##+js(no-xhr-if, method:POST)

! https://github.com/AdguardTeam/AdguardFilters/issues/106875
||b90.yahoo.co.jp^

! https://github.com/AdguardTeam/AdguardFilters/issues/110958
||jsdelivr.net^*/fp.min.js$script,redirect=fingerprint3.js:10

! https://github.com/uBlockOrigin/uAssets/issues/11885
/log/*$xhr,domain=vizcloud.*|vizcloud2.*

! https://github.com/uBlockOrigin/uAssets/issues/11895
||serasaexperian.com.br/dist/scripts/fingerprint2.js^$redirect=fingerprint2.js,script,important

! https://www.reddit.com/r/uBlockOrigin/comments/u13isu/how_to_block_fathom_tracking
/?p=%2F*&h=https%3A%2F%2F*&r=&sid=*&qs=*&cid=$image,1p
/?h=https%3A%2F%2F*&r=&sid=*&qs=*&cid=$image,1p
/?v=eyJoIjoiaHR0cHM6Ly9$image,1p
/?v=eyI*sImgiOiJodHRwczovL$image,1p
!/^https?:\/\/[-.0-9a-z]+\/script\.js$/$script,1p,strict3p,match-case

! https://github.com/uBlockOrigin/uAssets/issues/13059
||hdslb.com/bfs/cm/cm-sdk/static/js/bili-collect.js$script,redirect=noop.js,domain=bilibili.com,important

! https://assets.acdn.no/pkg/@amedia/browserid/1.1.6/index.js trackers
! https://github.com/uBlockOrigin/uAssets/pull/13408#issuecomment-1341756510
! ||no/api/aid/users/self?filter=*tracking$xhr

! https://github.com/uBlockOrigin/uAssets/issues/13958
||play.google.com/store/apps/*referrer$removeparam=referrer
||apps.apple.com/*/app/*referrer$removeparam=referrer

! https://github.com/uBlockOrigin/uAssets/issues/13970
||securemetrics.apple.com/b/ss/*maps$image,important

! techpowerup. com ping
||techpowerup.com/__botcheck$xhr

! https://github.com/uBlockOrigin/uAssets/issues/14653
||hktvmall.com/yuicombo?$script,removeparam=/_ui/shared/common/js/analytics/with-intersection-track.js
! https://github.com/uBlockOrigin/uAssets/issues/22702
! https://github.com/uBlockOrigin/uAssets/issues/22764
! ||hktvmall.com/yuicombo?$script,removeparam=/_ui/shared/common/js/InappCommunicationManager.js
! ||hktvmall.com/yuicombo?$script,removeparam=/_ui/shared/common/js/util/jquery.analytics-utils.js
! ||hktvmall.com/yuicombo?$script,removeparam=/^\/_ui\/desktop\/common\/js\/uiAnalytics\//
||hktvmall.com/_ui/desktop/common/js/uiAnalytics/
||hktvmall.com/_ui/shared/common/js/analytics/with-intersection-track.js
||hktvmall.com/_ui/shared/common/js/util/jquery.analytics-utils.js
||hktvmall.com/yuicombo|$script,1p

! https://github.com/uBlockOrigin/uAssets/issues/14850#issuecomment-1249571859
! https://github.com/uBlockOrigin/uAssets/issues/27336
/discourse-fingerprint-$domain=~btt.community

! https://github.com/easylist/easylist/issues/13695
ericdraken.com##+js(aopr, dataLayer)
ericdraken.com##^script[async]

! https://github.com/AdguardTeam/AdguardFilters/issues/81856
/s/s/js/m/om.js?v=

! https://github.com/uBlockOrigin/uAssets/issues/4059
! https://github.com/AdguardTeam/AdguardFilters/issues/135665
://vip.*/?pge=$image,3p
://ply.*/?v=$image,3p

! brave.com analytics
||brave.com/static-assets/js/analysis.js

! https://www.girlsofdesire.org/galleries/kana-kusakabe/00.html
/images/*/analytics.js$domain=girlsofdesire.org

! t3n.de tracking
||cl.t3n.de^
||c2shb.pubgw.yahoo.com/admax/bid/partners/PBJS

! doucolle.net analytics
||blozoo.info/js/inouttool/

! https://github.com/uBlockOrigin/uAssets/issues/15809
||hikari.jiocinema.com/v1/batch^
||hikari.jiocinema.com/v1/track^

! https://github.com/uBlockOrigin/uAssets/issues/16478
!||linkedin.com/li/track$xhr,1p
! https://github.com/uBlockOrigin/uAssets/issues/22627
linkedin.com##+js(href-sanitizer, a[href^="https://www.linkedin.com/redir/redirect?url=http"], ?url)

! https://github.com/uBlockOrigin/uAssets/issues/16730#issuecomment-1427957300
utreon.com##+js(no-xhr-if, utreon.com/pl/api/event method:POST)

! https://github.com/uBlockOrigin/uAssets/issues/16731
/^https:\/\/[0-9a-z]{7,25}\.com\/v2(?:\/0\/)?(?=[-_0-9a-z]{0,84}[A-Z])(?=[-_a-zA-Z]{0,84}[0-9])[-_0-9a-zA-Z]{54,85}(#\?v=[0-9a-f]{32})?$/$script,xhr,3p,match-case
! https://github.com/uBlockOrigin/uBlock-discussions/discussions/461
/^https:\/\/[0-9a-z]{7,25}\.com\/(?:assets|build|bundles|chunks|dist|files|j|public|scripts|static)?\/?(?:js\/)?[_0-9a-f]{6,16}\/?[_0-9a-f]{20,120}(?:[-.](?:app|bundle|ma?in|module|prod|index|v\d|vendor))?(?:\.js)?$/$script,3p,match-case,to=com,redirect=noopjs
/^https:\/\/[0-9a-z]{7,25}\.com\/[a-z]{0,7}\/?(?:js\/)?[_0-9a-f]{6,16}\/?[_0-9a-f]{20,120}(?:[-.][a-z0-9]{2,6})?(?:\.js)?$/$script,3p,match-case,to=com,header=x-datacenter

! https://github.com/uBlockOrigin/uAssets/issues/16751
zhihu.com##+js(no-xhr-if, log-sdk.ksapisrv.com/rest/wd/common/log/collect method:POST)

! https://github.com/AdguardTeam/AdguardFilters/issues/114908#issuecomment-1438714714
||torimochi.line-apps.com^$image,redirect=1x1.gif

! bilibili.com browser fingerprint collect
||api.bilibili.com/x/internal/gaia-gateway/ExClimbWuzhi$xhr,1p

! https://github.com/easylist/easylist/issues/14723
! https://github.com/easylist/easylist/commit/547cdd2b5e588437a602ac6a424bf499bbed896f
||p.typekit.net/p.css^$css,redirect=noop.css
||p.typekit.net/p.css^$css,domain=athleticpropulsionlabs.com|browserstack.com|bungie.net|petsafe.com|robertsspaceindustries.com,redirect=noop.css,important

! https://github.com/uBlockOrigin/uAssets/issues/17041
-telemetry.officeapps.live$ping,xhr

! https://github.com/uBlockOrigin/uAssets/issues/17119
||flow.microsoft.com/providers/Internal.Telemetry

! https://github.com/uBlockOrigin/uAssets/issues/17120
||client-telemetry.roblox.com^

! https://www.reddit.com/r/uBlockOrigin/comments/11rjv8n/
||kemono.party/js/script.js

! AdSpyglass tracker
/api/click/*?c=$image

! redirector
||cj.dotomi.com^
||new-twinks.com^
||terperbelomo.info^
||thebestoffers4you.net^
||trck.eczyl.com^
||trcp.gamefantech.com^
||turbotrck.art^
||track.opt-tds.com^
||track.link-tds.com^
||freetrckr.com^
||news-pewuce.com^
||cjewz.com^
||chpok.site^
||smartaccess.biz^
||adonsonlyd.xyz^

! https://github.com/uBlockOrigin/uAssets/issues/17786
! https://github.com/uBlockOrigin/uAssets/issues/20569
||adthrive.com^$removeparam,from=~mediaite.com|~a-z-animals.com

! branch.io sites
||cdn.branch.io/branch-latest.min.js$important,domain=nbc.com|pac-12.com

! onesignal-sites
||onesignal.com^$domain=blurayufr.xyz|columbian.com|faqwiki.us|freecoursesonline.me|ftuapps.dev|gamersdiscussionhub.com|levelupalone.com|onehack.us|xiaomitools.com

! narrative.com sites
||narrativ.com^$domain=androidauthority.com
||androidauthority.com/api/locate/

! optimizely-sites
! https://github.com/uBlockOrigin/uAssets/issues/18787
! https://www.reddit.com/r/uBlockOrigin/comments/157utus/articles_on_mindbodygreencom_wont_load/
||optimizely.com^$domain=mindbodygreen.com
||mindbodygreen.com/js/optimizely-$script,1p
mindbodygreen.com##+js(set-local-storage-item, segmentDeviceId, $remove$)

! geoip.cdn.arkadiumhosted.com
||geoip.cdn.arkadiumhosted.com^$domain=bestforpuzzles.com|charlotteobserver.com|dailygazette.com|independent.co.uk|miamiherald.com|standard.co.uk|word.tips

! sites with beacons
*$ping,domain=webnovel.com

! https://github.com/uBlockOrigin/uAssets/issues/17652
*$xhr,3p,denyallow=github.com|stripe.com|fpjs.pro,domain=fingerprint.com|~dev.fingerprint.com
||fingerprint.com^$strict3p,domain=fingerprint.com|~dev.fingerprint.com|~dashboard.fingerprint.com
||dashboard.fingerprint.com^$strict3p,xhr,domain=dashboard.fingerprint.com
fingerprint.com,~dev.fingerprint.com##+js(no-xhr-if, method:POST)

! lightboxcdn.com
||lightboxcdn.com^$domain=androidauthority.com|variety.com
||lightboxcdn.com/*/digibox.gif?
||lightboxcdn.com/*/jsonp/z?

! firebase analytics
/firebase-analytics.js$script,domain=zefoy.com
zefoy.com##+js(set, firebase.analytics, noopFunc)
! https://github.com/AdguardTeam/AdguardFilters/issues/156959
||firebase.googleapis.com^$domain=hotmediahub.com

! PMC-sites tracking
/pmc-plugins/pmc-social-share-bar/*/tracking.js

! McClatchy-sites tracking
/ng.gif?s*&e=$image,strict3p

! https://github.com/easylist/easylist/pull/16317#issuecomment-1593693211
!||analytics-sdk.yle.fi^$script,1p,important
!yle.fi##+js(set, yleAnalytics, noopFunc)

! https://github.com/uBlockOrigin/uAssets/issues/18562
bikesales.com.au##^html > head > :is([name="canonical"], [rel="canonical"]):not([content*="/details/"]):upward(1) > script[src*="optimizely"]

! https://github.com/uBlockOrigin/uAssets/issues/7646
! https://github.com/AdguardTeam/AdguardFilters/issues/154632
||telemetry*.transcend.io^

! https://www.eevblog.com/forum/buysellwanted/ fingerprint
||eevblog.com/forum/fp.php

! https://www.s4c.cymru/clic/series/864836464?sup=1 trackers
||2cnt.net/j0=$image,domain=s4c.cymru
||player-api.s4c-cdn.co.uk/analytics/$domain=s4c.cymru

! https://github.com/uBlockOrigin/uAssets/issues/18880
||aas.medialaben.no/a/

! https://nv.ua/ tracking cookie
! https://github.com/uBlockOrigin/uAssets/commit/299bcbbf7faed0f1007dc32197438f8c9a28af28#r122193300
||remp.nv.ua/assets/lib/js/remplib.js

! https://github.com/uBlockOrigin/uBlock-issues/discussions/2714#discussioncomment-6396384
! https://github.com/uBlockOrigin/uAssets/issues/21516
! https://github.com/uBlockOrigin/uAssets/pull/20143
!#if env_chromium
*$permissions=compute-pressure=(),from=~localhost|~127.0.0.1|~[::1]|~0.0.0.0|~[::]|~local
*$permissions=idle-detection=(),from=~localhost|~127.0.0.1|~[::1]|~0.0.0.0|~[::]|~local
*$permissions=keyboard-map=(),from=~localhost|~127.0.0.1|~[::1]|~0.0.0.0|~[::]|~local
! Privacy sandbox - https://developers.google.com/privacy-sandbox/private-advertising/setup/web/permissions-policy
! Attribution Reporting 
*$permissions=attribution-reporting=(),from=~localhost|~127.0.0.1|~[::1]|~0.0.0.0|~[::]|~local
! Federated Credential Management 
! Private Aggregation 
*$permissions=private-aggregation=(),from=~localhost|~127.0.0.1|~[::1]|~0.0.0.0|~[::]|~local
! Private State Tokens 
*$permissions=private-state-token-issuance=(),from=~localhost|~127.0.0.1|~[::1]|~0.0.0.0|~[::]|~local
*$permissions=private-state-token-redemption=(),from=~localhost|~127.0.0.1|~[::1]|~0.0.0.0|~[::]|~local
! Protected Audience 
*$permissions=join-ad-interest-group=(),from=~localhost|~127.0.0.1|~[::1]|~0.0.0.0|~[::]|~local
*$permissions=run-ad-auction=(),from=~localhost|~127.0.0.1|~[::1]|~0.0.0.0|~[::]|~local
! Shared Storage, Storage Access, requestStorageAccessFor = Related to third-party cookies
! User-Agent Client Hints
! Topics
*$permissions=browsing-topics=(),from=~localhost|~127.0.0.1|~[::1]|~0.0.0.0|~[::]|~local
!#endif

! https://github.com/uBlockOrigin/uAssets/issues/19100
/^https:\/\/kick\.com\/[0-9A-z]{16}\/[0-9A-z]{16}\?apiKey=/$script,1p,match-case,domain=kick.com

! https://www.reddit.com/r/uBlockOrigin/comments/1576b91/this_malicious_script_should_be_blocked/
||simonzody.com^

! https://www.nickjr.com/video/n0d0md/gabby-s-dollhouse-gabby-s-dollhouse-official-trailer
||tags.tiqcdn.com^$domain=nickjr.com
||events.paramount.tech^$redirect=nooptext,domain=nickjr.com

! https://github.com/uBlockOrigin/uAssets/issues/19194
||mps.nbcuni.com/images/MPS-STATISTIC-REPORTING.png

! https://github.com/uBlockOrigin/uAssets/issues/19221
||ab.blogs.es/abtest.png^$image,3p,domain=xataka.com|trendencias.com,redirect=1x1.gif,important

! Bounce/Click trackers
! https://github.com/uBlockOrigin/uAssets/issues/25925
://www.wattpad.com/et?$image
||wattpad.com/et*^l=http$doc,urlskip=?l

! https://github.com/uBlockOrigin/uAssets/issues/24153
! https://github.com/uBlockOrigin/uAssets/issues/25388
! https://github.com/uBlockOrigin/uAssets/issues/25609
! https://github.com/uBlockOrigin/uAssets/issues/23590
@@||track.adtraction.com/*&url=https://www.gog.com/$popup
||track.adtraction.com/*^url=https://www.gog.com/$doc,urlskip=?url -blocked
/t/t?a=*&url=http$doc,to=com|dk,urlskip=?url

! https://www.reddit.com/r/uBlockOrigin/comments/1g7m8av/opening_referral_links_from_slickdeals_are/
! https://soaps.sheknows.com/the-bold-and-the-beautiful/recaps/743811/finn-tells-li-luna-killed-tom-hollis/
! https://variety.com/2023/digital/news/disney-plus-first-four-indiana-jones-movies-exclusive-merch-1235629165/
! https://www.cnet.com/tech/best-labor-day-sales-2024-09-03/
! https://www.hunker.com/13770331/best-headboards/
! https://pcpartpicker.com/forums/topic/247066-everytime-i-click-a-newegg-link-i-get-redirected-to-anrdoezrsnet
! https://www.purewow.com/fashion/four-bs-french-outfit-staples
! https://github.com/uBlockOrigin/uAssets/issues/26126
! https://www.space.com/drone-deals
! https://www.nbcnews.com/select/shopping/amazon-black-friday-deals-2024-rcna182061
! https://www.dealnews.com/
/^https?:\/\/(?:[^.]+\.){2}(?:com|io|net)\/[a-zA-Z0-9]{6}\?subId1=[^&]+&u=http/$doc,to=com|io|net,urlskip=?u
/^https?:\/\/(?:[^.]+\.){2}(?:com|io|net)\/c(?:\/\d+){3}\/?\?.*?&?u=http/$doc,to=com|io|net,urlskip=?u
/^https?:\/\/(?:[^.]+\.){2}(?:com|io|net)\/c(?:\/\d+){3}\/?\?.*?&?url=http/$doc,to=com|io|net,match-case,urlskip=?url
/^https?:\/\/(?:[^.]+\.){2}(?:com|io|net)\/c(?:\/\d+){3}\/?\?.*?&?URL=http/$doc,to=com|io|net,match-case,urlskip=?URL
/^https?:\/\/www\.[a-z]+\.(?:com|net)\/click-\d{6,7}-\d{8}\b.*?[?&]url=http/$doc,to=com|net,match-case,urlskip=?url
/^https?:\/\/www\.[a-z]+\.(?:com|net)\/click-\d{6,7}-\d{8}\b.*?[?&]URL=http/$doc,to=com|net,match-case,urlskip=?URL
/Proxy.ashx?*&GR_URL=http$doc,urlskip=?GR_URL
||clicks.trx-hub.com/*^q=http$doc,urlskip=?q
||shop-links.co/link*^url=http$doc,urlskip=?url
||prf.hn/click/*/destination:http$doc,urlskip=/\/destination:([^\/]+)/ -uricomponent
||7tiv.net/*^u=http$doc,urlskip=?u +https
! https://github.com/uBlockOrigin/uAssets/issues/23729
||go.redirectingat.com/*^url=http$doc,urlskip=?url
||go.skimresources.com/*^url=http$doc,urlskip=?url

! https://github.com/uBlockOrigin/uAssets/issues/26126
||click.linksynergy.com/*^murl=http$doc,urlskip=?murl
||bestbuy.7tiv.net/c/*^u=https%3A%2F%2Fwww.bestbuy.com$doc,urlskip=?u -blocked

! https://www.namecheap.com/support/knowledgebase/article.aspx/10127/55/how-to-link-to-a-domain-search-result-page-on-namecheapcom/
! https://sandimaciver.com/simon-says-stamp-bee-yourself-4-cards-from-1-kit-video/
/r.cfm*^urllink=$document,urlskip=?urllink +https,to=shareasale-analytics.com|shareasale.com

! https://otherweb.com/n/jql8n85J
! https://upload.trinituner.com/v4/forums/viewtopic.php?t=319216&start=7500
||cc.*.com/v1/otc/*?merchant=*&url=http$doc,to=com,urlskip=?url

! https://github.com/brave/adblock-lists/commit/c6c8a9d0eafd52fba4a1c63d1e33404d90cbcad2
||click.pstmrk.it/*/$doc,urlskip=/\.pstmrk\.it\/[23][mst]{0,2}\/([^\/?#]+)/ -uricomponent +https

! https://x.com/LeBlorstOfTimes/status/1802874950132318572
! https://docs.planethowl.com/en/stable/clickmate.html
||howl.me/link*^url=http$doc,urlskip=?url
||howl.link/link*^url=http$doc,urlskip=?url

! https://www.engadget.com/samsung-galaxy-s23-ultra-review-specs-price-photo-and-video-take-center-stage-140034341.html
||shopping.yahoo.com/rdlw*^gcReferrer=http$doc,urlskip=?gcReferrer

! https://www.flexoffers.com/new-features/new-deep-linking-url-structure/
||track.flexlinks.com/a.ashx*^url=http$doc,urlskip=?url
! https://jljbacktoclassic.com/archives/16956
||track.flexlinkspro.com/a.ashx*^url=http$doc,urlskip=?url

! https://docs.fmtc.co/kb/pepperjam
! https://www.youtube.com/watch?v=HmonnOY9YK8
/t/*^url=http$doc,urlskip=?url,to=gopjn.com|pjatr.com|pjtra.com|pntra.com|pntrac.com|pntrs.com

! https://uncrate.com/everyday-carry-hacienda/
||wordseed.com/go/*^url=http$doc,urlskip=?url
||visit.ws/visit/*^url=http$doc,urlskip=?url
||go.uncrate.com/*^url=http$doc,urlskip=?url

! https://github.com/brave/adblock-lists/commit/576f306ba08f7be55e7635bd6b6e833250a8add7
! https://www.reddit.com/r/Muna/comments/1ea9h93/aftertaste_released_news/
||llo.to/e/*^url=http$doc,urlskip=?url
||events.laylo.com/r/redirect*^link=http$urlskip=?link

! https://www.reddit.com/r/uBlockOrigin/comments/10kryo7/streaklinkscom/
! https://capd.mit.edu/experiences/hackmit/
! https://econ.georgetown.edu/ug_opportunities/pre-doc-opportunity-stanford-law-school-empirical-research-fellowship/
! https://agilebrandguide.com/591-building-an-accessible-digital-experience-with-jennifer-griffin-smith-acquia/
||streaklinks.com/*/http$doc,urlskip=/\bstreaklinks\.com\/[^\/]+\/https?%3A%2F%2F([^\/?#]+)/ -uricomponent +https
||streak-link.com/*/http$doc,urlskip=/\bstreak-link\.com\/[^\/]+\/https?%3A%2F%2F([^\/?#]+)/ -uricomponent +https

! https://github.com/brave/brave-browser/issues/30731
||app.hive.co/email/elt/*^next=http$doc,urlskip=?next

! https://github.com/brave/adblock-lists/commit/0b6eae9de4f07ff53f402303316d7ec651f33434
! https://github.com/AdguardTeam/AdGuardSDNSFilter/issues/1784
||digidip.net/visit?*url=http$doc,urlskip=?url
||action.metaffiliation.com/trk.php*^redir=http$doc,urlskip=?redir

! https://unknowns.de/forum/thread/23727-innovation-ultimate/
||backerkit.com/ahoy/messages/*/click?*url=http$doc,urlskip=?url

! https://forums.majorgeeks.com/threads/bizrate-redirect.298636/
||rd.bizrate.com/rd*^t=http$doc,urlskip=?t

! https://forum.squarespace.com/topic/211400-link-to-google-form-disappeared-in-email/
||engage.squarespace-mail.com/r*^u=http$doc,urlskip=?u

! https://www.blackhatworld.com/seo/grab-your-shopify-120-day-trial-d.1386267/
! https://github.com/brave/adblock-lists/issues/993
/Prod/link-tracker?*redirectUrl=aHR0c$doc,urlskip=?redirectUrl -base64 -uricomponent

! https://success.awin.com/s/article/What-does-an-affiliate-link-look-like
! https://success.awin.com/articles/en_US/Knowledge/What-does-an-affiliate-link-look-like
! https://shutupandtakemyyen.com/product/pokemon-giant-cubone-skull-patch/
! https://support.mozilla.org/en-US/questions/832144
.php?*&p=http$doc,to=awin1.com,urlskip=?p
.php?*&ued=http$doc,to=awin1.com,urlskip=?ued

! https://www.chip.de/news/MediaMarkt-liefert-noch-kostenlos-Standard-und-Uberlieferservice-fuer-Null-Euro_184676397.html
||x.chip.de/linktrack/button/?url=http$doc,urlskip=?url
||de/trck/eclick/*^url=http$doc,to=pvn.mediamarkt.de|pvn.saturn.de,urlskip=?url

! https://www.reddit.com/r/MailChimp/comments/1c884qx/published_emails_trigger_your_connection_is_not/
||mailchimp.com/mctx/clicks?url=http$doc,urlskip=?url

! https://castbox.fm/episode/The-State-of-Influencer-Marketing-with-Andrew-Kamphey-id3097940-id286565488
||t.mailpgn.com/l/*^fl=http$doc,urlskip=?fl

! https://career.cuhk.edu.cn/en/job/view/id/459429
||jsv3.recruitics.com/redirect*^rx_url=http$doc,urlskip=?rx_url

! https://tenki.jp/
||app.adjust.com/*^redirect=http$doc,urlskip=?redirect
! https://saz-aktuell.com/so-geht-versicherung-heute-in-3-steps-perfekt-abgesichert/
||app.adjust.com/*^fallback=http$doc,urlskip=?fallback

! https://www.twitch.tv/officialtopgun/about
||t.cfjump.com/*^Url=http$doc,urlskip=?Url

! https://www.zen-cart.com/showthread.php?113326-Banner-Manager-Message-The-connection-was-refused-when-attempting-to-contact-localho
! https://github.com/brave/adblock-lists/pull/897
||clixgalore.com/Lead.aspx*^LP=$doc,urlskip=?LP -uricomponent +https
! https://github.com/brave/adblock-lists/pull/770
||clixgalore.com/Lead.aspx*^AffDirectURL=$doc,urlskip=?AffDirectURL -uricomponent +https

! https://github.com/brave/adblock-lists/issues/894
||ojrq.net/p/?return=http$doc,urlskip=?return
||d.agkn.com/pixel/*^l1=http$doc,urlskip=?l1

! https://experienceleague.adobe.com/en/docs/audience-manager/user-guide/implementation-integration-guides/media-data-integration/click-data-pixels
||demdex.net/*^d_rd=http$doc,urlskip=?d_rd

! https://github.com/brave/adblock-lists/issues/892
||api.bam-x.com/api/v1/clickmate/*^url=http$doc,urlskip=?url

! https://pub-docs.valuecommerce.ne.jp/docs/as-63-item-api/
||valuecommerce.com/servlet/*^vc_url=http$doc,urlskip=?vc_url
! https://jmty.jp/ibaraki/sale-hom/article-1662iu
||valuecommerce.com/resolve/*^u=http$doc,urlskip=?u
||valuecommerce.ne.jp/cgi-bin/*^vc_url=http$doc,urlskip=?vc_url
||affiliate.shopping.yahoo.co.jp/entry*^vc_url=http$doc,urlskip=?vc_url

! https://dev.tradedoubler.com/crossdevice/publisher/
||tradedoubler.com/click*^url=http$doc,urlskip=?url
||redir.tradedoubler.com/projectr/?_td_deeplink=http$doc,urlskip=?_td_deeplink

! https://docs.webgains.dev/docs/platform-api-1/e0818c5e27f62-get-feed-products
||track.webgains.com/click.html*^wgtarget=http$doc,urlskip=?wgtarget

! https://samanthareneehansen.com/
||nordstrom.com/Linkshare*^url=http$doc,urlskip=?url
||sephora.com/affiliates.jsp*^url=http$doc,urlskip=?url

! https://github.com/brave/adblock-lists/commit/7666f7556747ff9f57646b827b16640f2cfe479b
||nutribullet.com/t/*^url=http$doc,urlskip=?url
||getprice.com.au/prodhits.aspx*^link=http$doc,urlskip=?link

! https://forums.redflagdeals.com/henrys-used-camera-equipment-20-off-90-day-warranty-ends-march-28-2024-2676433/
||c.pepperjamnetwork.com/click*^url=http$doc,urlskip=?url

! https://support.avantlink.com/hc/en-us/articles/208058053-Affiliate-Link-Encoder-Affiliate-User-Guide-Automate-Tracking-Links-for-Website-Content
||avantlink.com/click.php*^url=http$doc,urlskip=?url

! https://www.aashibeauty.com/blogs/hair-blog/best-curly-hair-products-to-transform-your-next-wash-day
||narrativ.com/api/v0/client_redirect/*^url=http$doc,urlskip=?url
||queue.ulta.com/*^t=http$doc,urlskip=?t

! https://help.icontact.com/customers/s/article/Your-Message-Contains-An-Invalid-Link
||click.icptrack.com/icp/relay.php*^destination=http$doc,urlskip=?destination

! https://www.sport-passion.fr/comparatifs/meilleurs-compteurs-gps-de-velo-et-vtt.php
||track.effiliation.com/servlet/effi.redir*^url=http$doc,urlskip=?url
||tradeinn.com/ts/*^trg=http$doc,urlskip=?trg
||fsx.i-run.fr/*^redir=http$doc,urlskip=?redir

! https://www.planetminecraft.com/mod/star-wars-clone-wars-332-battalion-armor-set/
||mcpedl.com/leaving/?url=http$doc,urlskip=?url +https

! https://lists.ettus.com/empathy/thread/MP5S6U5Y44IQ7Y2YQWIGIGDGBC36VCKU
||c212.net/c/link/*^u=http$doc,urlskip=?u +https

! https://www.threads.net/@mosseri/post/C0m-tFjvitg/small-but-notable-update-to-share-weve-updated-the-link-referrer-for-threads-so-
threads.net##+js(json-prune, require.0.3.0.__bbox.define.[].2.is_linkshim_supported)
||l.threads.net/?u=http$doc,urlskip=?u

! https://www.bleepingcomputer.com/news/security/googles-mysterious-searchapp-links-leave-android-users-concerned/
||search.app^*link=http$doc,urlskip=?link

! https://github.com/uBlockOrigin/uBlock-issues/issues/3206#issuecomment-2487392846
bing.com##+js(href-sanitizer, a[href^="/rebates/welcome?url=http"], ?url)
||bing.com/ck/a*^u=a1aHR0c$doc,urlskip=/[?&]u=a1(aHR0c[^&#]+)/ -safebase64
||bing.com/rebates/welcome?url=http$doc,urlskip=?url
||bing.com/alink/link?url=http$doc,urlskip=?url

! https://www.avforums.com/threads/philips-oled908-remote.2478922/
||ds1.nl/redirect/*^dai_url=http$doc,urlskip=?dai_url

! https://www.dealnews.com/
||c.next2.io/*^link=http$doc,urlskip=?link
/^https?:\/\/(?:www\.anrdoezrs\.net|cj\.dotomi\.com)\/links(?:-t)?\/\d+\/sid\/[^\/]+\/http/$doc,to=cj.dotomi.com|www.anrdoezrs.net,urlskip=/\/sid\/[^\/]+\/(http[^?]+)/
! https://github.com/uBlockOrigin/uBlock-issues/issues/1096
||anrdoezrs.net/links/*/type/dlg/http$doc,urlskip=/\/dlg\/(http[^?]+)/

! https://www.thingiverse.com/thing:4702801
/tradetracker/?tt=*&r=http$doc,urlskip=?r

! https://www.androidauthority.com/black-friday-deals-2024-3499762/
! https://github.com/uBlockOrigin/uAssets/issues/26204
||r.bttn.io/?*&btn_pub_ref=*&btn_url=http$doc,urlskip=?btn_url
||r.bttn.io/?*&btn_pub_ref=*&btn_desktop_url=http$doc,urlskip=?btn_desktop_url

! https://www.insidehook.com/deals
||prsm1.com/r?url=http$doc,urlskip=?url

! https://link.theskimm.com/view/6021f603fd42236acb38801cmcvvy.kfzp/c1e7a749
||link.theskimm.com/click/*/aHR0c$doc,urlskip=/\/click\/[^\/]+\/(aHR0c[^\/]+)/ -base64

! https://www.xda-developers.com/black-friday-laptop-deals/
||redirect.viglink.com/*^ourl=http$doc,urlskip=?ourl
||redirect.viglink.com/*^u=http$doc,urlskip=?u

! https://www.zdnet.com/article/best-black-friday-deals-2024-11-28/
||affportal.bhphoto.com/dl/redventures/*^u=http$doc,urlskip=?u

! https://elotrolado.net/hilo_el-podcast-de-eol-episodio-43-e3-cronica-de-una-muerte-anunciada_2360079
||dlk.ivoox.com/dlk/*^link=http$doc,urlskip=?link

! https://slickdeals.net/
||slickdeals.net/i.php?*&u2=http$doc,urlskip=?u2
||amazon.com/gp/redirect.html?*&location=http$doc,urlskip=?location
||link.sylikes.com/*^url=http$doc,urlskip=?url
||sofi.com/atr/p/v1/a?u=http$doc,urlskip=?u

! https://github.com/uBlockOrigin/uBlock-discussions/discussions/775#discussioncomment-10120835
||justwatch.com/a?*^r=http$doc,urlskip=?r
||click.trafficguard.ai/*^lpurl=http$doc,urlskip=?lpurl

! https://www.reddit.com/r/uBlockOrigin/comments/1h62o3m/provide_a_clean_url_for_strict_blocks/
||awstrack.me/L0/http$doc,urlskip=/\/L0\/(http[^\/?#]+)/ -uricomponent

! https://forums.malwarebytes.com/topic/283053-legitimate-weblink-from-soundcloud-blocked/
||gate.sc^*url=http$doc,urlskip=?url

! https://firebase.google.com/docs/dynamic-links/create-manually
! https://community.flutterflow.io/database-and-apis/post/firebase-dynamic-link-works-fine-on-google-play-store-but-not-on-app-i2tHgRXnxGajPyO
!#if !env_mobile
||page.link/*^ofl=http$doc,urlskip=?ofl
!#endif

! https://github.com/uBlockOrigin/uBOL-home/issues/278
||invol.co/aff_m?*url=http$doc,urlskip=?url

! Click Trackers
! https://reddit.com/r/uBlockOrigin/comments/14t3y1d/
html.duckduckgo.com,lite.duckduckgo.com##+js(href-sanitizer, a[href^="//duckduckgo.com/l/?uddg="], ?uddg)
! https://starstyle.com
starstyle.com##+js(href-sanitizer, a[href^="https://go.skimresources.com/"][href*="&url=http"], ?url)
! https://insidehook.com/deals
! https://github.com/uBlockOrigin/uAssets/issues/26126
! https://www.space.com/best-black-friday-deals-sales
! https://github.com/uBlockOrigin/uBOL-home/issues/278
insidehook.com,nbcnews.com,pcpartpicker.com,space.com,tomshardware.com##+js(href-sanitizer, a[href^="https://click.linksynergy.com/"][href*="link?id="][href*="&murl=http"], ?murl)
! [NSFW] https://fap18.net/video/88120176/danny-d-2-milfs-and-that-big-cock?c=milf & https://fap18.net/xid/45560506/ and similar
fap18.net,xxxmom.net,fuck55.net,gofucker.com,sexu.tv,vid123.net,babe8.net,beeg.porn##+js(href-sanitizer, a[href^="/vp/player/to/?u=http"]\, a[href^="/vp/download/goto/?u=http"], ?u)
/vp/player/to/?u=http$doc,urlskip=?u
/vp/download/goto/?u=http$doc,urlskip=?u
! [NSFW] https://losporn.org/black-beautys-10-watch-online-free and similar
! https://github.com/uBlockOrigin/uAssets/issues/20330
losporn.org,streamporn.li,pandamovies.org,bananamovies.org,xopenload.net,adultdvdparadise.com,speedporn.net,mangoporn.net,pandamovie.info,mangoporn.co,mangoparody.com,xxxscenes.net,pornkino.cc,watchxxxfree.pw,pandamovie.in,speedporn.pw,watchfreexxx.net,youwatchporn.com,watchpornfree.info,pandamovies.me,xtapes.me,netflixporno.net,pornwish.org,freeomovie.info,fullxxxmovies.me,watchpornx.com,xxxparodyhd.net,xxxstream.me,pornwatch.ws,xopenload.pw,onstreams.net,playpornfree.xyz,pandamovies.pw,streamporn.pw,xopenload.me##+js(href-sanitizer, a[href^="https://drivevideo.xyz/link?link=http"], ?link)
! https://nowinstock.net/computers/videocards/nvidia/rtx4090/
nowinstock.net##+js(href-sanitizer, a[href^="https://click.linksynergy.com/deeplink?id="][href*="&murl="], ?murl)
nowinstock.net##+js(href-sanitizer, a[href*="?"][href*="&url=http"], ?url)
nowinstock.net##+js(href-sanitizer, a[href*="?"][href*="&u=http"], ?u)
! https://paypal.com/uk/home
paypal.com##+js(href-sanitizer, a[href^="https://app.adjust.com/"][href*="?fallback=http"], ?fallback)
! https://elotrolado.net/hilo_el-podcast-de-eol-episodio-43-e3-cronica-de-una-muerte-anunciada_2360079
elotrolado.net##+js(href-sanitizer, a[href^="https://go.redirectingat.com?url=http"], ?url)
! [NSFW] https://tube188.com/catalog/cheating/
tube188.com##+js(href-sanitizer, a[href^="/check.php?"][href*="&url=http"], ?url)
! https://tomshardware.com/news/windows-11-gaming-benchmarks-performance-vbs-hvci-security
tomshardware.com##+js(href-sanitizer, a[href^="https://click.linksynergy.com/deeplink?id="][href*="&murl=http"], ?murl)
! http://disq.us/p/2vt2qs2
! https://github.com/uBlockOrigin/uAssets/issues/20066
disqus.com##+js(href-sanitizer, a[href^="https://disq.us/url?url="][title^="http"], [title])
disqus.com##+js(href-sanitizer, a[href^="https://disq.us/?url=http"], ?url)
disqus.com##a[href][data-link-out]:remove-attr(data-link-out)
! https://steamcommunity.com/games/221410/announcements/detail/1602634609636894200
steamcommunity.com##+js(href-sanitizer, a[href^="https://steamcommunity.com/linkfilter/?url=http"], ?url)
steamcommunity.com##+js(href-sanitizer, a[href^="https://steamcommunity.com/linkfilter/?u=http"], ?u)
! https://colab.research.google.com/ - Needs sign-in
colab.research.google.com##+js(href-sanitizer, a[href^="https://colab.research.google.com/corgiredirector?site=http"], ?site)
! https://www.xda-developers.com/lenovo-yoga-7i-500-deal/
xda-developers.com##+js(href-sanitizer, a[href^="https://shop-links.co/link/?"][href*="&url=http"], ?url)
xda-developers.com##+js(href-sanitizer, a[href^="https://redirect.viglink.com/?"][href*="ourl=http"], ?ourl)
! https://www.reddit.com/r/uBlockOrigin/comments/17psek6/what_exactly_is_jdoqocycom_and_why_does_every/
isthereanydeal.com##+js(href-sanitizer, a[href^="http://www.jdoqocy.com/click-"][href*="?URL=http"], ?URL)
isthereanydeal.com##+js(href-sanitizer, a[href^="https://track.adtraction.com/t/t?"][href*="&url=http"], ?url)
! https://github.com/easylist/easylist/issues/18317#issuecomment-1895677833
metager.org##+js(href-sanitizer, a[href^="https://metager.org/partner/r?link=http"], ?link)
! https://github.com/uBlockOrigin/uAssets/issues/23160
idnes.cz##+js(aeld, click, pingUrl)
idnes.cz##+js(aeld, mousedown, scoreUrl)
! https://www.reddit.com/r/uBlockOrigin/comments/1ci0wma/when_clicking_on_some_deal_links_on_slickdeals/
slickdeals.net##+js(href-sanitizer, a[href*="go.redirectingat.com"][href*="url=http"], ?url)
! https://github.com/uBlockOrigin/uAssets/issues/23729
slickdeals.net##+js(href-sanitizer, a[href^="https://slickdeals.net/?"][href*="u2=http"], ?u2)
! https://github.com/uBlockOrigin/uAssets/issues/23590
dk.pcpartpicker.com##+js(href-sanitizer, a[href^="https://online.adservicemedia.dk/"][href*="deeplink=http"], ?deeplink)
! https://github.com/uBlockOrigin/uBlock-discussions/discussions/775#discussioncomment-10120835
justwatch.com##+js(href-sanitizer, 'a[href*=".justwatch.com/a?"][href*="&r=http"]', ?r)
! https://variety.com/2023/digital/news/disney-plus-first-four-indiana-jones-movies-exclusive-merch-1235629165/
variety.com##+js(href-sanitizer, a[href^="https://clicks.trx-hub.com/"][href*="bn5x.net"], ?q?u)
! https://www.engadget.com/samsung-galaxy-s23-ultra-review-specs-price-photo-and-video-take-center-stage-140034341.html
engadget.com##+js(href-sanitizer, a[href^="https://shopping.yahoo.com/rdlw?"][href*="gcReferrer=http"], ?gcReferrer)
! https://github.com/uBlockOrigin/uAssets/issues/25754
! https://soaps.sheknows.com/the-bold-and-the-beautiful/recaps/743811/finn-tells-li-luna-killed-tom-hollis/
! https://www.hunker.com/13770331/best-headboards/
! https://otherweb.com/n/jql8n85J
! https://pcgamingwiki.com/wiki/Grand_Theft_Auto_V
! https://www.cnet.com/tech/best-labor-day-sales-2024-09-03/
! https://www.purewow.com/fashion/four-bs-french-outfit-staples
! https://www.space.com/drone-deals
! https://jljbacktoclassic.com/archives/16956
! https://www.dogfoodadvisor.com/best-dog-foods/best-puppy-foods/
! https://www.androidauthority.com/black-friday-deals-2024-3499762/
! https://www.notebookcheck.net/Affordable-HP-Victus-gaming-laptop-with-RTX-3050-beating-RX-6550M-gets-40-discount-in-Best-Buy-sale.873491.0.html
cnet.com##+js(set, Object.prototype.updateModifiedCommerceUrl, noopFunc)
cnet.com,dogfoodadvisor.com,hunker.com,insidehook.com,nbcnews.com,notebookcheck.net,pcgamingwiki.com,pcpartpicker.com,purewow.com,sheknows.com,space.com,streetinsider.com,tomshardware.com,zdnet.com##+js(href-sanitizer, 'a[href*="?"][href*="u=http"]:is([href*=".com/c/"],[href*=".io/c/"],[href*=".net/c/"],[href*="?subId1="],[href^="https://affportal.bhphoto.com/dl/redventures/?"])', ?u)
androidauthority.com,cnet.com,hunker.com,insidehook.com,jljbacktoclassic.com,nbcnews.com,otherweb.com,pcpartpicker.com,pcgamingwiki.com,purewow.com,space.com,sport-passion.fr,tomshardware.com,zdnet.com##+js(href-sanitizer, 'a[href*="?"][href*="url=http"]:is([href^="https://cc."][href*=".com/v1/otc/"][href*="merchant="],[href^="https://go.skimresources.com"],[href^="https://go.redirectingat.com"],[href^="https://invol.co/aff_m?"],[href^="https://shop-links.co/link"],[href^="https://track.effiliation.com/servlet/effi.redir?"],[href*=".com/a.ashx?"],[href^="https://www."][href*=".com/t/"],[href*=".prsm1.com/r?"],[href*=".com/click-"],[href*=".net/click-"],a[href*=".com/t/t?a="],a[href*=".dk/t/t?a="])', ?url)
space.com,tomshardware.com,zdnet.com##+js(href-sanitizer, a[href*="/Proxy.ashx?"][href*="GR_URL=http"], ?GR_URL)
! https://www.windowscentral.com/software-apps/opera-will-independently-continue-supporting-ublock-origin
windowscentral.com##+js(href-sanitizer, a[href^="https://go.redirectingat.com/"][href*="&url=http"], ?url)
! https://shutupandtakemyyen.com/product/pokemon-giant-cubone-skull-patch/
! https://www.thisiswhyimbroke.com/white-elephant-gifts/
insidehook.com,nbcnews.com,shutupandtakemyyen.com,space.com,thisiswhyimbroke.com,xda-developers.com##+js(href-sanitizer, a[href*="awin1.com/"][href*=".php?"][href*="ued=http"], ?ued)
insidehook.com,nbcnews.com,shutupandtakemyyen.com,space.com,thisiswhyimbroke.com,xda-developers.com##+js(href-sanitizer, a[href*="awin1.com/"][href*=".php?"][href*="p=http"], ?p)
! https://forums.redflagdeals.com/henrys-used-camera-equipment-20-off-90-day-warranty-ends-march-28-2024-2676433/
forums.redflagdeals.com##+js(href-sanitizer, a.autolinker_link[href*=".com/t/"][href*="url=http"], ?url)
! https://www.sport-passion.fr/comparatifs/meilleurs-compteurs-gps-de-velo-et-vtt.php
sport-passion.fr##+js(href-sanitizer, a[rel="sponsored nofollow"][href^="https://fsx.i-run.fr/?"][href*="redir=http"], ?redir)
sport-passion.fr##+js(href-sanitizer, a[rel="sponsored nofollow"][href*=".tradeinn.com/ts/"][href*="trg=http"], ?trg)
! https://jljbacktoclassic.com/archives/16956
insidehook.com,jljbacktoclassic.com##+js(href-sanitizer, a[href*=".com/r.cfm?"][href*="urllink=http"], ?urllink)
! https://soundcloud.com/user-182079869/premera-klipa-leonid-agutin-vladimir-presnyakov-dnk
soundcloud.com##+js(href-sanitizer, a[href^="https://gate.sc"][href*="?url=http"], ?url)
! https://github.com/uBlockOrigin/uAssets/issues/7950
slant.co##+js(trusted-replace-argument, HTMLAnchorElement.prototype.getAttribute, 0, json:"class", condition, data-direct-ad)
! https://voz.vn/
||go.isclix.com/deep_link/*?url=http$doc,urlskip=?url
||static.accesstrade.vn/js/atsmarttag.min.js
voz.vn##a.link.link--external[href][data-proxy-href]:remove-attr(data-proxy-href)

! https://github.com/uBlockOrigin/uAssets/issues/24675 - click tracking
||cdn.digg.com/fragments/homepage/static/view-frontpage.js

! https://chataigpt.org
/detroitchicago/dpv.gif?$image
/detroitchicago/imp.gif$ping

! https://ozlosleep.com/pages/buy-sleepbuds
/wpm@*/web-pixel-
/shopifycloud/media-analytics/v*/analytics.js

! Tracking cookies
! fastly click-through
beaumontenterprise.com,chron.com,ctinsider.com,ctpost.com,expressnews.com,houstonchronicle.com,lmtonline.com,middletownpress.com,mrt.com,newstimes.com,nhregister.com,registercitizen.com,sfchronicle.com,stamfordadvocate.com,thehour.com,timesunion.com##+js(cookie-remover, realm.cookiesAndJavascript)
! heavyfetish.com tracking
! https://github.com/uBlockOrigin/uAssets/issues/15185#issuecomment-2249740629
heavyfetish.com##+js(set, flashvars.event_reporting, '')
heavyfetish.com##+js(cookie-remover, kt_qparams)
heavyfetish.com##+js(cookie-remover, kt_referer)
! https://github.com/uBlockOrigin/uAssets/issues/18588
! https://github.com/uBlockOrigin/uAssets/commit/bae8d13992b1c754f83dc268060a8079973d3253#commitcomment-118856194
nypost.com,pagesix.com##+js(json-prune, dataLayer.trackingId user.trackingId)
columbian.com,nypost.com,pagesix.com##+js(cookie-remover, blaize_tracking_id)
! https://www.factable.com/history/maps-that-show-us-a-new-perspective/3/
factable.com##+js(cookie-remover, akaclientip)
factable.com##+js(cookie-remover, hive_geoloc)
! https://www.bing.com/
! https://www.msn.com/en-us/money/markets/elon-musk-s-outlook-on-our-future-turns-dour/ar-AA1iZxwn
! https://github.com/uBlockOrigin/uAssets/issues/24667
bing.com,msn.com,web.skype.com##+js(cookie-remover, MicrosoftApplicationsTelemetryDeviceId)
web.skype.com##+js(cookie-remover, MicrosoftApplicationsTelemetryFirstLaunchTime)
! https://capcom.fandom.com/wiki/Gallery:Bishamon
! fandom.com##+js(set-cookie, tracking_session_id, OK, , reload, 1)
fandom.com##+js(set-cookie, Geo, OK)
||script.wikia.nocookie.net/fandom-ae-assets/identity-service/
! https://www.clickorlando.com/weather/2023/09/06/cone-computer-models-more-lee-forecast-to-become-major-hurricane/
clickorlando.com##+js(set-cookie, bitmovin_analytics_uuid, OK)
! https://www.1und1.de/
1und1.de##+js(cookie-remover, /optimizelyEndUserId|s_fid|sc_tcr|s_cc/)
1und1.de##+js(set-local-storage-item, /optimizely_data|tealium_timing/, $remove$)
! Sending tracking cookies
imgur.com##+js(set, Object.prototype.has_opted_out_tracking, trueFunc)
! https://www.boundless.com/
boundless.com##+js(cookie-remover, _boundless_tracking_id)
! https://github.com/uBlockOrigin/uAssets/issues/27105
community.fortinet.com##+js(remove-cookie, /LithiumVisitor|ValueSurveyVisitorCount|VISITOR_BEACON/)
! kt player
! https://github.com/uBlockOrigin/uAssets/issues/10011
! https://github.com/uBlockOrigin/uAssets/issues/17149#issuecomment-1651198474
camhub.cc,heavyfetish.com,kissjav.*,severeporn.com,shemale6.com,watchporn.to##+js(cookie-remover, kt_ips)
! cxense.com
bizjournals.com,businessinsider.de,computerbild.de##+js(remove-cookie, /^(_pc|cX_)/, when, scroll keydown)
! adobedtm.com
bizjournals.com##+js(remove-cookie, /^AMCVS?_/)
! disqus.com
disqus.com##+js(remove-cookie, disqus_unique, when, scroll keydown)
disqus.com##+js(trusted-set-cookie, disqus_unique, 0, , , domain, disqus.com)
! shopify
ozlosleep.com##+js(remove-cookie, /_shopify_(y|sa_)/, when, scroll keydown)
! https://github.com/uBlockOrigin/uAssets/issues/27516
naszemiasto.pl##+js(trusted-set-cookie, _sharedid, , 0, , domain, .naszemiasto.pl)
! https://www.reddit.com/r/uBlockOrigin/comments/1jeq4th/worldstar_videos_take_6_secs_to_play_how_do_i_fix/
worldstar.com##+js(remove-cookie, /ana_client_session_id|wshh_uid/)

! Query parameter stripping
! Google ads/analytics
$removeparam=gbraid
$removeparam=wbraid
$removeparam=gclsrc
$removeparam=gclid
! https://support.google.com/analytics/answer/10071811
$removeparam=_gl
! https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
$removeparam=dclid
! https://support.google.com/analytics/answer/11479699
! https://github.com/AdguardTeam/AdguardFilters/issues/162080
! https://github.com/DandelionSprout/adfilt/issues/715
$removeparam=srsltid
! Facebook analytics
$removeparam=fbclid
$removeparam=fb_action_ids
$removeparam=fb_action_types
$removeparam=fb_comment_id
$removeparam=fb_ref
$removeparam=fb_source
! Yandex Metrika
! https://github.com/brave/brave-browser/issues/33216
$removeparam=ymclid
$removeparam=ysclid
$removeparam=yclid
! https://help.ads.microsoft.com/apex/index/3/en/60000
$removeparam=msclkid
! Wicked Reports click tracking
$removeparam=wickedid
! https://tsunen.team-lab.com/?twclid=2-3bhrj1ny7p11v5r9pap3anqge
$removeparam=twclid
! Hubspot tracking https://knowledge.hubspot.com/ads/ad-tracking-in-hubspot
$removeparam=__hsfp
$removeparam=__hssc
$removeparam=__hstc
$removeparam=_hsenc
$removeparam=hsa_acc
$removeparam=hsa_ad
$removeparam=hsa_cam
$removeparam=hsa_grp
$removeparam=hsa_kw
$removeparam=hsa_la
$removeparam=hsa_mt
$removeparam=hsa_net
$removeparam=hsa_ol
$removeparam=hsa_src
$removeparam=hsa_tgt
$removeparam=hsa_ver
$removeparam=hsCtaTracking
! MailChimp click tracking
$removeparam=mc_eid
! Adobe SiteCatalyst Campaign Tracking ID parameter
! https://github.com/uBlockOrigin/uAssets/issues/27448
$doc,removeparam=s_cid
! vero
$removeparam=vero_conv
$removeparam=vero_id
! Olytics
! https://github.com/brave/brave-browser/issues/17451
! https://github.com/brave/brave-browser/issues/13644
! https://www.reddit.com/r/uBlockOrigin/comments/16c6rq0/why_does_ublockorigin_break_this_websites_login/
$removeparam=rb_clickid
$removeparam=oly_anon_id
! https://github.com/brave/brave-browser/issues/11579
$removeparam=_openstat
! https://github.com/brave/brave-browser/issues/17507
$removeparam=ml_subscriber
$removeparam=ml_subscriber_hash
! https://github.com/brave/brave-browser/issues/22082
$removeparam=oft_id
$removeparam=oft_k
$removeparam=oft_lk
$removeparam=oft_d
$removeparam=oft_c
$removeparam=oft_ck
$removeparam=oft_ids
$removeparam=oft_sk
! https://github.com/AdguardTeam/AdguardFilters/issues/89869
! email subscriptions tracking
$removeparam=bsft_clkid
$removeparam=bsft_eid
$removeparam=bsft_mid
$removeparam=bsft_uid
$removeparam=bsft_aaid
$removeparam=bsft_ek
! https://github.com/brave/brave-browser/issues/25691
$removeparam=guce_referrer
$removeparam=guce_referrer_sig
! Matomo/Piwik
$removeparam=mtm_campaign
$removeparam=mtm_cid
$removeparam=mtm_content
$removeparam=mtm_group
$removeparam=mtm_keyword
$removeparam=mtm_medium
$removeparam=mtm_placement
$removeparam=mtm_source
$removeparam=pk_campaign
$removeparam=pk_medium
$removeparam=pk_source
! https://github.com/brave/brave-browser/issues/31084
! https://piwik.pro/url-builder-tool/
$removeparam=pk_cid
! ActiveCampaign
! https://github.com/brave/brave-browser/issues/26295
$removeparam=vgo_ee
! Cxense clickthrough tracking
$removeparam=cx_click
$removeparam=cx_recsOrder
$removeparam=cx_recsWidget
! adjust.com tracking
$removeparam=gps_adid
$removeparam=unicorn_click_id
$removeparam=adjust_creative
$removeparam=adjust_tracker_limit
$removeparam=adjust_tracker
$removeparam=adjust_adgroup
$removeparam=adjust_campaign
! impact.com
! https://github.com/uBlockOrigin/uAssets/issues/27751
$removeparam=ir_campaignid
$removeparam=ir_adid
$removeparam=ir_partnerid
! https://github.com/brave/brave-browser/issues/34578
$removeparam=_kx
! AT Internet
! https://github.com/brave/brave-browser/issues/32488
$removeparam=at_campaign
$removeparam=at_campaign_type
$removeparam=at_creation
$removeparam=at_emailtype
$removeparam=at_link
$removeparam=at_link_id
$removeparam=at_link_origin
$removeparam=at_link_type
$removeparam=at_medium
$removeparam=at_ptr_name
$removeparam=at_recipient_id
$removeparam=at_recipient_list
$removeparam=at_send_date
! https://github.com/brave/brave-browser/issues/24988
$removeparam=ss_email_id
! https://github.com/brave/brave-browser/issues/37847
$removeparam=et_rid
! https://github.com/brave/brave-browser/issues/37971
$removeparam=bbeml
! https://github.com/brave/brave-browser/issues/39575
! https://stackoverflow.com/questions/37882810/what-is-meaning-of-branch-match-id
$removeparam=_branch_match_id
$removeparam=_branch_referrer
! https://github.com/brave/brave-browser/issues/40716
$removeparam=_bhlid
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8036123
! https://ads.tiktok.com/help/article/tiktok-click-id
$removeparam=sms_click
$removeparam=sms_source
$removeparam=sms_uph
$removeparam=ttclid
! https://help.emarsys.com/hc/en-us/articles/5860708183441-Changing-the-contact-identification-method-in-Web-Extend
! https://github.com/brave/brave-browser/issues/43077
$removeparam=sc_customer
$removeparam=sc_eh
$removeparam=sc_uid
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-5867802
$removeparam=asc_campaign,domain=aboutamazon.com|amazon.*|amzn.to
$removeparam=asc_refurl,domain=aboutamazon.com|amazon.*|amzn.to
$removeparam=asc_source,domain=aboutamazon.com|amazon.*|amzn.to
! youtube.com - Copy video URL at its search result via mouse right click.
||youtube.com^$removeparam=pp
! https://github.com/AdguardTeam/AdguardFilters/issues/173471
||youtu.be^$removeparam=si
! Embedded tweets
$removeparam=refsrc,domain=twitter.com|x.com
$removeparam=ref_src,domain=twitter.com|x.com
$removeparam=ref_url,domain=twitter.com|x.com
! Twitter
$removeparam=cxt,domain=twitter.com|x.com
$removeparam=s,domain=twitter.com|x.com
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8955444
! https://github.com/brave/adblock-lists/pull/1455
! eBay tracking parameters
||www.ebay.$removeparam=ssspo
||www.ebay.$removeparam=sssrc
||www.ebay.$removeparam=ssuid
||www.ebay.$removeparam=mkevt
||www.ebay.$removeparam=mkcid
||www.ebay.$removeparam=_trkparms
! https://github.com/uBlockOrigin/uAssets/issues/25247
! ||www.ebay.$removeparam=_trksid
||www.ebay.$removeparam=amdata
||www.ebay.$removeparam=mkrid
||www.ebay.$removeparam=campid
! https://github.com/brave/brave-browser/issues/35094
! instagram.com - share tracking
||instagram.com^$removeparam=ig_rid
||instagram.com^$removeparam=igsh
$removeparam=igshid,domain=instagram.com|threads.net
! msn.com url tracking
||msn.com^$doc,removeparam=ocid
||msn.com^$doc,removeparam=pc
||msn.com^$doc,removeparam=cvid
||msn.com^$doc,removeparam=ei
||msn.com^$doc,removeparam=vid
! spotify.com tracking
||open.spotify.com^$removeparam=referral
||open.spotify.com^$removeparam=si
! https://github.com/uBlockOrigin/uAssets/issues/18938#issuecomment-1693238481
! https://community.brave.com/t/unable-to-open-reddit-com-urls-in-private-tabs/503125/4
!#if env_firefox
||reddit.com^$removeparam=rdt,doc
!#endif
! https://github.com/uBlockOrigin/uAssets/issues/27036
||kochava.com^$3p
||control.kochava.com^$removeparam=_rt
||control.kochava.com^$removeparam=device_id
||control.kochava.com^$removeparam=ftag
||control.kochava.com^$removeparam=ko_exchange
||control.kochava.com^$removeparam=network_id
||control.kochava.com^$removeparam=site_id
||control.kochava.com^$removeparam=/^utm_/
! cxense.com
||api.cxense.com/public/widget/data^$removeparam=eid0
||api.cxense.com/public/widget/data^$removeparam=eit0
||api.cxense.com/public/widget/data^$removeparam=media
||api.cxense.com/public/widget/data^$removeparam=prnd
||api.cxense.com/public/widget/data^$removeparam=rnd
||api.cxense.com/public/widget/data^$removeparam=sid
||api.cxense.com/public/widget/data^$removeparam=usi
||api.cxense.com/public/widget/data^$removeparam=widgetId
! Exceptions
@@||web.archive.org/*/http$removeparam
! https://github.com/uBlockOrigin/uAssets/issues/25350
@@||urldefense.com^$removeparam

! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-10269579
! https://github.com/uBlockOrigin/uAssets/issues/25667
! https://www.reddit.com/r/uBlockOrigin/comments/1g50usk/amazon_similar_items_link_resolving_to_bad_url/
/dp/*/ref=$doc,uritransform=/\/ref=[^\/?#]+//,to=www.amazon.*
! https://jljbacktoclassic.com/archives/16956
! https://www.ruled.me/supplements/
||amazon.com/s/ref=$doc,uritransform=/\/ref=[^\/?#]+//
/gp/*/ref=$doc,uritransform=/\/ref=[^\/?#]+//,to=www.amazon.*
/^https:\/\/www\.primevideo\.com\/(?:detail|help|offers)[^=]*?\/ref=/$doc,to=primevideo.com,uritransform=/\/ref=[^\/?#]+//

! https://www.bhphotovideo.com/c/product/1405061-REG/samsung_u32j590_31_5_4k_uhd.html/BI/865/KBID/1173/SID/dbd77874b38811ef8f447ae1da200b850INT
||bhphotovideo.com/c/product/*.html/$doc,uritransform=/\.html\/[^?#]+/.html/

! https://github.com/easylist/easylist/issues/16468#issuecomment-1691717458
natgeotv.com##+js(no-xhr-if, /VisitorAPI|AppMeasurement/)
natgeotv.com##+js(set, Visitor, {})
||fichub.com/plugins/adobe/lib/$xhr,domain=natgeotv.com,important

! https://comikey.com/
||house.comikey.com/unw.gif?$image,1p

! https://github.com/easylist/easylist/issues/17135
||googletagmanager.com/gtag/js$domain=starblast.io,important

! https://github.com/uBlockOrigin/uAssets/issues/19954
||cdn.cuty.io/fps.js$script

! https://lenovo.com/us/en/legal/copytrade/?orgRef=[...] - Search Google for "Lenovo copyright", Click on the first result
! https://www.reddit.com/r/uBlockOrigin/comments/1f8yhos/lenovo_site_not_loading/
www.lenovo.com##+js(trusted-replace-argument, history.replaceState, 2, "''", condition, ?orgRef)

! https://developers.google.com/tag-platform/tag-manager/server-side/send-data
! https://simoahava.com/analytics/server-side-tagging-google-tag-manager
!*$1p,strict3p,script,header=via:1.1 google

! PersianBlocker filters
! web.bale.ai - Tracking (OS and browser)
!#if !env_mobile
!web.bale.ai##+js(trusted-set, navigator.userAgent, '{"value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML\, like Gecko) Chrome/119.0.0.0 Safari/537.36"}')
!#else
!web.bale.ai##+js(trusted-set, navigator.userAgent, '{"value": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML\, like Gecko) Chrome/119.0.6045.66 Mobile Safari/537.36"}')
!#endif
! https://www.halaldownload.com/%d8%af%d8%a7%d9%86%d9%84%d9%88%d8%af-%d9%82%d8%b3%d9%85%d8%aa-6-%d9%81%d8%b5%d9%84-2-%d8%b2%d8%ae%d9%85-%da%a9%d8%a7%d8%b1%db%8c-%d8%a8%d8%a7%d8%b2%da%af%d8%b4%d8%aa/ - Download links
||upera.shop/ref/$doc,uritransform=/^\/ref\/[^\/]+//

! https://www.makeuseof.com/best-vs-code-chatgpt-extensions/ - Tracking cookies
androidpolice.com,makeuseof.com,movieweb.com,xda-developers.com##+js(cookie-remover, /articlesRead|previousPage/) 

! https://github.com/uBlockOrigin/uAssets/issues/20440
! https://github.com/uBlockOrigin/uAssets/issues/26578
/^https?:\/\/chatgpt\.com\/ces\/v1\/[a-z]$/$xhr,domain=chatgpt.com|openai.com|sora.com,method=post

! https://github.com/uBlockOrigin/uAssets/issues/20530
airtel.in##+js(no-xhr-if, analytics/bulk-pixel)

! https://elevenlabs.io/dubbing - Stores the last dubbing result
elevenlabs.io##+js(set-local-storage-item, IIElevenLabsDubbingResult, $remove$)

! Pepper redirection - pepper.ru/deals/post-428233 | pepper.pl/promocje/post-750379 | dealabs.com/bons-plans/post-2674687
chollometro.com##+js(href-sanitizer, a[href*="https://www.chollometro.com/visit/"][title^="https://"], [title])
dealabs.com##+js(href-sanitizer, a[href*="https://www.dealabs.com/visit/"][title^="https://"], [title])
hotukdeals.com##+js(href-sanitizer, a[href*="https://www.hotukdeals.com/visit/"][title^="https://"], [title])
mydealz.de##+js(href-sanitizer, a[href*="https://www.mydealz.de/visit/"][title^="https://"], [title])
nl.pepper.com##+js(href-sanitizer, a[href*="https://nl.pepper.com/visit/"][title^="https://"], [title])
pepper.it##+js(href-sanitizer, a[href*="https://www.pepper.it/visit/"][title^="https://"], [title])
pepper.pl##+js(href-sanitizer, a[href*="https://www.pepper.pl/visit/"][title^="https://"], [title])
pepper.ru##+js(href-sanitizer, a[href*="https://www.pepper.ru/visit/"][title^="https://"], [title])
preisjaeger.at##+js(href-sanitizer, a[href*="https://www.preisjaeger.at/visit/"][title^="https://"], [title])
promodescuentos.com##+js(href-sanitizer, a[href*="https://www.promodescuentos.com/visit/"][title^="https://"], [title])
pelando.com.br##+js(href-sanitizer, a[href*="https://www.pelando.com.br/api/redirect?url="], ?url)
! desidime.com##+js(href-sanitizer, a[href*="https://www.desidime.com/links?ref=][href*="&url="], &url)

! https://github.com/uBlockOrigin/uAssets/issues/21342
proboards.com,winclassic.net##+js(rmnt, script, vglnk)
proboards.com,winclassic.net##^script:has-text(vglnk)

! https://github.com/uBlockOrigin/uAssets/issues/21384
! FootprintDNS
||res.office365.com/footprint/v*/scripts/fp-min.js$script
||res.office365.com/footprint/v*/scripts/fpconfig.json$script
||atmrum.net/rum.js$script
||atmrum.net/client/v*/atm/fpv*.min.js$script
||atmrum.net/conf/v*/atm/fpconfig.min.json$script
||config.fp.measure.office.com/conf/v*/*/fpconfig.min.json$script
||fp.msedge.net/conf/v*/asgw/fpconfig.min.json?monitorId=asgw$script
/apc/trans.gif
/apc/r.gif
||atmrum.net/report/v*/atm/r.gif
||fp.msedge.net/r.gif
||odinvzc.azureedge.net/apc/trans.gif

! https://github.com/AdguardTeam/AdguardFilters/issues/168248
||bi-tracker-cn.rivergame.net/event/tracker$xhr,redirect=noop.txt

! https://baomoi.com/ - znews.vn/zingnews.vn - Tracking pixels
/n/images/su?info$xhr,1p
://log.$image,1p,domain=znews.vn|zingnews.vn

! https://github.com/uBlockOrigin/uAssets/issues/22077
coursera.org##+js(no-fetch-if, eventing)
||coursera.org/*/eventing/

! https://github.com/uBlockOrigin/uAssets/issues/22076
||rambler.ru/*#rcmrclid=$uritransform=/#rcmrclid=.*//

! https://github.com/uBlockOrigin/uAssets/issues/22295
||cmp.*.no^*/metrics/$important

! https://github.com/uBlockOrigin/uAssets/issues/22493
/^https:\/\/mudah\.my\/[a-zA-Z0-9]{16}\/[a-zA-Z0-9]{16}\?apiKey=/$script,1p,domain=mudah.my

! https://github.com/uBlockOrigin/uAssets/issues/20586#issuecomment-1949649857
! m.youtube.com,music.youtube.com,tv.youtube.com,www.youtube.com,youtubekids.com,youtube-nocookie.com##+js(href-sanitizer, a[href^="https://www.youtube.com/redirect?event=video_description"][href*="&q=http"], ?q)
||youtube.com/redirect?*^q=http$urlskip=?q +https

! https://github.com/uBlockOrigin/uAssets/issues/22631#issuecomment-1962238669
||view.mngusr.com^$domain=chapmanganato.to|manganato.com

! https://github.com/uBlockOrigin/uAssets/issues/22676
||analytics.strapi.io^

! https://www.royalroad.com/home
||royalroad.com/dist/sentry.js$script

! https://github.com/uBlockOrigin/uAssets/issues/23299
streamin.me##^responseheader(set-cookie)

! https://github.com/uBlockOrigin/uAssets/issues/24130
||api.modrinth.com/analytics/

! https://dev.to/oliverjumpertz/making-good-use-of-ts-expect-error-in-typescript-1f41
dev.to##+js(cookie-remover, ahoy_visitor)
dev.to##+js(cookie-remover, ahoy_visit)

! https://www.autotrader.com/cars-for-sale/electric/cars-between-17000-and-26000/alpharetta-ga
||partner.awscconsumerinfo.autotrader.com/*/beacon/

! https://github.com/brave/adblock-lists/pull/1850
advocate-news.com,akronnewsreporter.com,bocopreps.com,bostonherald.com,broomfieldenterprise.com,brushnewstribune.com,buffzone.com,burlington-record.com,canoncitydailyrecord.com,chicagotribune.com,chicoer.com,coloradodaily.com,coloradohometownweekly.com,courant.com,dailybreeze.com,dailybulletin.com,dailycamera.com,dailydemocrat.com,dailyfreeman.com,dailylocal.com,dailynews.com,dailypress.com,dailytribune.com,delcotimes.com,denverpost.com,eastbaytimes.com,eastbaytimes.com,eptrail.com,excelsiorcalifornia.com,fortmorgantimes.com,greeleytribune.com,journal-advocate.com,julesburgadvocate.com,lamarledger.com,lowellsun.com,macombdaily.com,mainlinemedianews.com,marinij.com,mcall.com,mendocinobeacon.com,mercurynews.com,mercurynews.com,montereyherald.com,morningjournal.com,nashobavalleyvoice.com,news-herald.com,nydailynews.com,ocregister.com,oneidadispatch.com,orlandosentinel.com,orovillemr.com,paradisepost.com,pasadenastarnews.com,pilotonline.com,pottsmerc.com,pressandguide.com,pressenterprise.com,presstelegram.com,readingeagle.com,record-bee.com,redbluffdailynews.com,redlandsdailyfacts.com,reporterherald.com,sandiegouniontribune.com,santacruzsentinel.com,saratogian.com,sbsun.com,sentinelandenterprise.com,sgvtribune.com,siliconvalley.com,southplattesentinel.com,sun-sentinel.com,themorningsun.com,thenewsherald.com,theoaklandpress.com,thereporter.com,thereporteronline.com,times-standard.com,timescall.com,timesherald.com,timesheraldonline.com,trentonian.com,troyrecord.com,twincities.com,ukiahdailyjournal.com,voicenews.com,whittierdailynews.com,willitsnews.com##+js(set-session-storage-item, nxt_is_incognito, false)

! https://github.com/uBlockOrigin/uAssets/issues/24577
pitchfork.com##+js(href-sanitizer, a[href^="https://cna.st/"][data-offer-url^="https://"], [data-offer-url])

! https://www.vpnmentor.com
||vpnmentor.com/jssdk/track/
vpnmentor.com##+js(cookie-remover, /_alooma/)

! torrentfreak.com
||torrentfreak.com/js/script.js

! jiosaavn.com
||jiosaavn.com/stats.php^

! https://github.com/AdguardTeam/AdguardFilters/pull/185966
/\/[a-z]{8}\.js\?st=[0-9A-Z]{6,8}$/$script,1p,strict3p,match-case

! https://github.com/easylist/easylist/commit/9145f6e5ba23f6968605120c3ba213a9b92ae2d7
||fundingchoicesmessages.google.com/i/$script,domain=globo.com,important

! https://github.com/uBlockOrigin/uAssets/issues/24881
||babia.to/index.php^
||babia.to/job.php^

! https://www.euronews.com/my-europe/2024/08/11/ditching-generators-and-recycling-buildings-how-paris-did-the-olympics-different
! https://github.com/easylist/easylist/commit/04e9aa501ca9765523eed25f6409aa15f7e1a7a9
||g.doubleclick.net/tag/js/gpt.js$script,redirect=googletagservices_gpt.js:5,domain=euronews.com,important

! onlyfans click tracking
||onlyfans.com/api2/v2/users/clicks-stats^
||onlyfans.com/away^$urlskip=?url

! https://github.com/uBlockOrigin/uAssets/issues/25016
||forecast.lemonde.fr/p/action/
||lemonde.fr/*?s=$xhr,method=post

! spankbang tracking
! https://github.com/uBlockOrigin/uAssets/issues/27574
||spankbang.com/static/dist/desktop/js/analytics$script
||assets.sb-cd.com/static/dist/desktop/js/analytics.
! https://github.com/uBlockOrigin/uAssets/issues/25974
! https://github.com/uBlockOrigin/uAssets/issues/27672
spankbang.*##+js(set, send_gravity_event, noopFunc)
spankbang.*##+js(set, send_recommendation_event, noopFunc)

! https://github.com/uBlockOrigin/uAssets/issues/25180
perplexity.ai##+js(aost, window.screen.height, setTimeout)
||perplexity.ai/rest/metrics/collect^$xhr,1p,method=post

! https://github.com/uBlockOrigin/uAssets/issues/25204
nytimes.com##+js(no-fetch-if, api.theathletic.com/graphql body:/PostEvent|PostImpressions/)

! https://www.oligo.security/blog/0-0-0-0-day-exploiting-localhost-apis-from-the-browser
! https://github.com/uBlockOrigin/uBlock-issues/issues/3443
!#if cap_ipaddress
*$strict3p,ipaddress=0.0.0.0,domain=~0.0.0.0|~127.0.0.1|~[::1]|~[::]|~local|~localhost
! *$strict3p,ipaddress=::,domain=~0.0.0.0|~127.0.0.1|~[::1]|~[::]|~local|~localhost
!#endif

! https://github.com/uBlockOrigin/uAssets/issues/25432
/^https:\/\/[a-z]\d{3}\.[a-z]+\.com\/script\.js$/$script,1p,strict3p,domain=com,redirect=noopjs

! https://github.com/uBlockOrigin/uAssets/issues/25467
||inficourses.com/_next/static/chunks/pages/course/%5Bslug%5D-$1p,script

! https://github.com/uBlockOrigin/uAssets/issues/25467
||shrinkearn.com/full?*&type=1$urlskip=?url -base64 +https

! cloudflare.com tracking
blog.cloudflare.com,www.cloudflare.com##+js(no-fetch-if, method:POST body:zaraz)
||radar.cloudflare.com/api/analytics

! https://github.com/uBlockOrigin/uAssets/issues/25532
||udc.yahoo.com^

! https://github.com/uBlockOrigin/uAssets/issues/25558
||gitbook.com/v1/integrations/googleanalytics/

! https://www.reddit.com/r/uBlockOrigin/comments/1fzfpfj/a_small_issue_with_targetcom/
!#if env_firefox
forum.blu-ray.com##a[href][onclick*="this.href"]:remove-attr(/^on(?:click|contextmenu|mouseover)$/)
!#else
forum.blu-ray.com##+js(ra, onclick|oncontextmenu|onmouseover, a[href][onclick*="this.href"], stay)
!#endif

! https://github.com/uBlockOrigin/uBlock-issues/issues/3206#issuecomment-2403795984
||podtrac.com^*redirect.mp3/$urlskip=/\/redirect\.mp3\/([^?]+\.mp3\b)/ +https
! https://github.com/uBlockOrigin/uBlock-issues/issues/3206#issuecomment-2406674420
! https://www.reddit.com/r/uBlockOrigin/comments/1if6l4n/podcasts_not_playing_on_web_with_ublockorigin/
/track/*$to=chtbl.com|chrt.fm|tracking.swap.fm,urlskip=/\/track\/\w+\/([^?]+)/ +https
||pdst.fm/e/$urlskip=/\/e\/([^?]+)/ +https
||mgln.ai/e/$urlskip=/\/e\/\w+\/([^?]+)/ +https
||pdrl.fm^$urlskip=/pdrl\.fm\/\w+\/([^?]+)/ +https

! https://github.com/uBlockOrigin/uAssets/issues/25609
||gog.com/productcard/users/activity/log

! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-10437157
||onual.com/*^link_t=$doc,uritransform=/#[^\/?]+//
onual.com##+js(href-sanitizer, a.btn[href^="https://zxro.com/u/?url=http"], ?url)

! https://github.com/AdguardTeam/AdguardFilters/issues/181699
globo.com##+js(trusted-set, libAnalytics, json: {"status":{"dataAvailable":false}\,"data":{}})
globo.com##+js(set, libAnalytics.data.get, noopFunc)

! https://github.com/uBlockOrigin/uAssets/issues/25826
||videovak.com/log/

! https://github.com/uBlockOrigin/uAssets/issues/25759#issuecomment-2445393624
dailystar.co.uk,mirror.co.uk##+js(no-xhr-if, cmp.inmobi.com/geoip)
! https://www.mirror.co.uk/3am/celebrity-news/rachel-zeglers-snow-white-bombs-34917163
mirror.co.uk##+js(trusted-set-cookie, _sharedid, , 0, , domain, .mirror.co.uk)
mirror.co.uk##+js(remove-cookie, /_vf|mantisid|pbjs_/)
mirror.co.uk##+js(set-local-storage-item, /_analytics|ppid/, $remove$)

! https://github.com/uBlockOrigin/uAssets/issues/25842
||an.yandex.ru^$script,redirect=noopjs,domain=moyaposylka.ru

! https://github.com/uBlockOrigin/uAssets/issues/25871
||flaticon.com/_ga?

! https://github.com/uBlockOrigin/uAssets/issues/25885
||googletagmanager.com/gtag/js$domain=17track.net,important

! https://github.com/uBlockOrigin/uBlock-issues/issues/3440
bentasker.co.uk##+js(no-xhr-if, method:POST url:pfanalytics.bentasker.co.uk)

! https://www.reddit.com/r/uBlockOrigin/comments/1gi6lcl/cheatographycom_detects_ubo/
||data.cheatography.com^

! darkreader.org tracking pings CNAME
||herokudns.com^$xhr,domain=darkreader.org

! https://github.com/uBlockOrigin/uAssets/commit/70472d3fd373bb0a2102be3261e76502782bcb42
||karistudio.com/wp-content/plugins/wp-statistics/assets/js/tracker.js^$important

! https://github.com/uBlockOrigin/uAssets/issues/26001
||facebook.com/security/hsts-pixel.gif
||facebook.com/async/wbloks/log/

! https://github.com/uBlockOrigin/uAssets/issues/16965#issuecomment-1446481850
||windowspro.de/stats/

! https://github.com/uBlockOrigin/uAssets/issues/24730
||tvaplus.ca/api/log^

! https://github.com/uBlockOrigin/uAssets/issues/23504
||startpage.com/sp/dplpxs

! https://github.com/uBlockOrigin/uAssets/issues/25203
||gigachadlitics.b-cdn.net^

! https://github.com/uBlockOrigin/uAssets/issues/26299
||substack.com/api/v1/firehose/batch

! https://github.com/uBlockOrigin/uAssets/issues/22792
||nakedanalytics.net^

! grabify.org - IP logger service
/^https:\/\/grabify\.org\/[A-Z0-9]+$/$doc

! https://urlscan.io/result/54547ba8-b938-476a-b931-ad6824507b8b/#redirects
! https://urlscan.io/result/c018947c-61ee-48f7-8a88-147ae8b794a3/#redirects
||email.stripe.com/CL0/$doc,urlskip=/\/CL0\/(http.*?)\/\d\/[a-f0-9-]+\// -uricomponent
||q.stripe.com/?domain=$image

! https://github.com/uBlockOrigin/uAssets/issues/26464
discord.com##+js(no-xhr-if, discord.com/api/v9/science)

! email tracking
://www.wattpad.com/et?$image
://links1.pawns.app/q/$image
://email-analytics.meetup.com/$image
://myanimelist.net/pixel?$image
://myanimelist.net/static/logging.gif?$image
://rd.remove.bg/CI0/$image
://mg.mail.notion.so/$image
://ecmweb.com/images/shim.png$image
://link.nzz.ch/v1/emailopen?$image
://newsletter.adnz.co/$image
://voz.vn/b/image.gif?p=$image
://delighted.com/e/$image
://snl.patch.com/imp?$image
://link.patch.com/img/*.gif$image
://pixel.patch.com/
://pianoencyclopedia.com/en/email/images/*/pix.gif$image
://tlr.stripocdn.email/content/guids/$image
://static.adsugar.ch/img?ord=$image
.avforums.com/b/image.gif?$image
.fiverr.com/js_event_tracking/v1/track_email_open/$image
.*%2Fwf%2Fopen%3Fupn%3D$image
.quora.com%2Fqemail%2Fmark_read%3Fct%3D$image
! https://github.com/uBlockOrigin/uBlock-discussions/discussions/929
||googleusercontent.com/*/wf/open?upn=$image

! beacons.ai analytics
||beacons.ai/api/rtanalytics/
||beacons.ai/api/public_actions

! https://github.com/uBlockOrigin/uBlock-issues/issues/3325
||store.steampowered.com/app/usabilitytracking/

! https://github.com/uBlockOrigin/uAssets/issues/26593
||joinhoney.com/evs

! https://github.com/easylist/easylist/commit/9be6c6b0981b48b4b5e5d5a02d7f0a4870bf9d7c
! https://www.cornwalllive.com/news/cornwall-news/ufo-sighting-cornwall-family-films-9815680
||g.doubleclick.net/tag/js/gpt.js$script,xhr,domain=cornwalllive.com,important
||g.doubleclick.net/gpt/pubads_impl_$domain=cornwalllive.com,important

! https://github.com/AdguardTeam/AdguardFilters/commit/4daa90c90372f1413f6c6790386c80886526a169
||s.pie.org^
||t.pie.org^

! https://github.com/uBlockOrigin/uAssets/issues/26644
||tonordersitye.com/s*&r$urlskip=?r -base64

! https://github.com/uBlockOrigin/uBlock-issues/issues/3504
||suno.com/metrics/
||suno.com/v1//rgstr
||suno.com/monitoring

! https://github.com/ co-pilot error endpoint
||github.com/_private/browser/errors

! https://github.com/uBlockOrigin/uAssets/issues/26709
||curseforge.com/linkout$urlskip=?remoteUrl -uricomponent

! razorpay analytics
||razorpay.com/v1/track

! https://github.com/uBlockOrigin/uAssets/issues/26805
||bitchute.com/data/1

! https://github.com/uBlockOrigin/uAssets/issues/25438
||api.flipkart.com/4/data/collector/business

! https://github.com/easylist/easylist/issues/21077
||internal-api.prolific.com/api/v1/statistics/

! chat.deepseek.com analytics
! https://github.com/uBlockOrigin/uAssets/pull/27339
||apmplus.volces.com/monitor_web/collect$xhr,method=post
||gator.volces.com/list$xhr,method=post

! https://github.com/uBlockOrigin/uAssets/issues/26946
||sex-empire.org/templates/*/js/metrika.js

! https://github.com/uBlockOrigin/uAssets/issues/26973
||ipify.org^$domain=realmoasis.com

! https://github.com/easylist/easylist/issues/21148
www.hoyolab.com,www.hoyoverse.com##+js(remove-cookie, /^DEVICEFP/)
hoyoverse.com,~www.hoyoverse.com##+js(trusted-set-cookie, DEVICEFP, 00000000000, , , domain, .hoyoverse.com)
hoyoverse.com,~www.hoyoverse.com##+js(trusted-set-cookie, DEVICEFP_SEED_ID, , 0, , domain, .hoyoverse.com)
hoyoverse.com,~www.hoyoverse.com##+js(trusted-set-cookie, DEVICEFP_SEED_TIME, , 0, , domain, .hoyoverse.com)
hoyolab.com,~www.hoyolab.com##+js(trusted-set-cookie, DEVICEFP, 00000000000, , , domain, .hoyolab.com)
hoyolab.com,~www.hoyolab.com##+js(trusted-set-cookie, DEVICEFP_SEED_ID, , 0, , domain, .hoyolab.com)
hoyolab.com,~www.hoyolab.com##+js(trusted-set-cookie, DEVICEFP_SEED_TIME, , 0, , domain, .hoyolab.com)

! https://github.com/uBlockOrigin/uAssets/issues/27114
||flight-report.com/api/event

! https://github.com/uBlockOrigin/uAssets/issues/27134
liquipedia.net##+js(remove-cookie, /^_pk_/)

! https://github.com/uBlockOrigin/uAssets/issues/27151
||eezy.api.kustomerapp.com/c/v1/tracking/
||videezy.com/clicks/
!#if env_firefox
videezy.com##a[onclick="fire_download_click_tracking();"]:remove-attr(onclick)
!#else
videezy.com##+js(ra, onclick, a[onclick="fire_download_click_tracking();"], complete)
!#endif

! https://github.com/uBlockOrigin/uAssets/issues/27183
thehindu.com##+js(remove-cookie, _pc_private)

! https://github.com/bluesky-social/social-app/blob/d155b718b5b27003bad698c8d54ccf8b6a3f295c/src/lib/strings/url-helpers.ts#L323-L336
! https://github.com/uBlockOrigin/uAssets/pull/27500
||go.bsky.app/redirect*^u=http$urlskip=?u

! https://www.farmersjournal.ie/news/news/my-farming-week-thomas-cosby-stradbally-co-laois-247317
!#if cap_html_filtering
farmersjournal.ie##^script:has-text(/detect|FingerprintJS/)
!#else
farmersjournal.ie##+js(rmnt, script, /detect|FingerprintJS/)
!#endif
||farmersjournal.ie/js/detectIncognito.min.js
farmersjournal.ie##+js(remove-cookie, _vid_t)
farmersjournal.ie##+js(set-local-storage-item, /^_vid_(lr|t)$/, $remove$)

! https://www.reddit.com/r/uBlockOrigin/comments/1j7yh8b/adblock_detected_on_souqdesigncom_blur_persists/
||wsimg.com/traffic-assets/$script,3p
||wsimg.com/signals/$script,3p
souq-design.com##+js(remove-cookie, /^(_tccl_|_scc_session|fpfid)/)

! https://github.com/easylist/easylist/pull/21305
||optable.co^$3p
laurelberninteriors.com##+js(set-local-storage-item, /adthrive|ccuid|at_sticky_data|geo-location|OPTABLE_/, $remove$)
laurelberninteriors.com##+js(set-session-storage-item, /previous/, $remove$)
laurelberninteriors.com##+js(set, adthrive._components.start, noopFunc)

! https://online.evropa2.cz/
||s.actve.net/js/nr/nrc.min.js
evropa2.cz##+js(set-local-storage-item, /cnc_alien_invasion_code|pixelsLastFired/, $remove$)

! Merge in resource-abuse.txt
!#include resource-abuse.txt
`;

/**
 * AdGuard tracking parameters filter - general
 * Source: https://raw.githubusercontent.com/AdguardTeam/AdguardFilters/refs/heads/master/TrackParamFilter/sections/general_url.txt
 */
export const ADGUARD_GENERAL_TRACK_PARAMS = `
!
! This section contains the list of generic \`$removeparam\` rules that are applied on every website.
! You should only put here known parameters that are used on many websites.
! IMPORTANT: add a comment that explains where this parameter comes from (what tracking company is using it).
! Ideally, supply a link to the document that explains how this parameter is used.
!
! Good: $removeparam=utm_id
! Bad:  $removeparam=utm_id,domain=example.org (for instance, should be in specific.txt)
!
!
! https://www.weblio.jp/ranking/?from=glia player.gliacloud.com anywhere
?from=glia^$removeparam=from
! Google Merchant Center tracking
$removeparam=srsltid
! Segmentify
$removeparam=_sgm_campaign
$removeparam=_sgm_term
$removeparam=_sgm_pinned
! https://support.ebis.ne.jp/s/article/23146
$removeparam=ebisOther1
$removeparam=ebisOther2
$removeparam=ebisOther3
$removeparam=ebisOther4
$removeparam=ebisOther5
! https://docs.bemob.com/en/bemob-click-urls
$removeparam=bemobdata
! Unidentified email subscription system
$removeparam=_bhlid
! Not identified. Popular on Japanese sites
$removeparam=_bdadid
! a8.net
$removeparam=a8
! personaclick.com
$removeparam=recommended_by
$removeparam=recommended_code
$removeparam=personaclick_search_query
$removeparam=personaclick_input_query
! Emarsys
$removeparam=ems_dl
$removeparam=emcs_t
! channelsight.com
$removeparam=cstrackid
! Tracking in casino links
/?affijet-click=$removeparam
! https://theaffiliateplatform.com/affiliate-custom-links/
$removeparam=btag
! jmty.jp
$removeparam=jmtyClId
! TCS
$removeparam=Tcsack
! Visumo
! https://www.shipsltd.co.jp/g/g316300136/?vsm_type=video&vsm_cid=e5011602-1b1c-44b0-a695-ca27aa94b448&vsm_pid=3163001362299
$removeparam=vsm_type
$removeparam=vsm_cid
$removeparam=vsm_pid
! Commission Junction
! https://developers.cj.com/docs/advertiser-site-tracking/enhanced-tracking-integration
$removeparam=cjdata
$removeparam=cjevent
! AT Internet
$removeparam=/^at_custom/
$removeparam=at_campaign
$removeparam=at_campaign_type
$removeparam=at_creation
$removeparam=at_emailtype
$removeparam=at_link
$removeparam=at_link_id
$removeparam=at_link_origin
$removeparam=at_link_type
$removeparam=at_medium
$removeparam=at_ptr_name
$removeparam=at_recipient_id
$removeparam=at_recipient_list
$removeparam=at_send_date
! Email subscription tracking
$removeparam=_ope
! AappsFlyer
! https://support.appsflyer.com/hc/en-us/articles/18730398273553
$removeparam=af_xp
$removeparam=af_ad
$removeparam=af_adset
$removeparam=af_click_lookback
$removeparam=af_force_deeplink
$removeparam=is_retargeting
&af_xp=$removeparam=c
&af_xp=$removeparam=pid
! https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
$removeparam=dclid
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8036123
$removeparam=sms_click
$removeparam=sms_source
$removeparam=sms_uph
$removeparam=ttclid
! spot.im
$removeparam=spot_im_redirect_source
! WordPress Visitor Statistics plugin
$cookie=_wp_visitor
! tracker.my.com
$removeparam=mt_link_id
! https://github.com/AdguardTeam/AdguardFilters/issues/164394
$removeparam=iclid
! https://github.com/AdguardTeam/AdguardFilters/issues/158662
$removeparam=user_email_address
! https://support.google.com/analytics/answer/10071811
$removeparam=_ga
$removeparam=_gl
! Coremetrics
! https://help.hcltechsw.com/commerce/8.0.0/coremetrics/refs/rmtusecmpcore.html
! https://help.goacoustic.com/hc/en-us/articles/360042483794-Marketing-Channels-report
$removeparam=cm_me
$removeparam=cm_cr
$removeparam=/^cm_mmc/
! https://github.com/AdguardTeam/AdguardFilters/issues/155405
! Used by shareasale.com
$removeparam=sscid
! Click tracking. Probably used by malware
! https://github.com/AdguardTeam/AdguardFilters/issues/154659
$removeparam=rtkcid
rtkcid=*&clickid=$removeparam=clickid
! https://github.com/AdguardTeam/AdguardFilters/issues/152387
! Sovrn (VigLink) tracking
$removeparam=cuid
! impact.com
$removeparam=ir_campaignid
$removeparam=ir_adid
$removeparam=irclickid
$removeparam=ir_partnerid
! IO Technologies
! Identify a period of time for which unique visitors use our website
$removeparam=__io_lv
! Counts sessions of unique visitors
$removeparam=_io_session_id
! https://seksohub.com/video/family-strokes-adria-rae-familystrokes-mothers-day-threesome-step-mom-07c320d88b275hp?asgtbndr=1
$removeparam=asgtbndr
! https://help.zeydoo.com/en/articles/4362736-how-to-setup-zeydoo-s2s-conversion-tracking
$removeparam=ymid
^z=*&var=$removeparam=var
! Tradedoubler
! https://dev.tradedoubler.com/tracking/advertiser/
$removeparam=tduid
! GLAMI click id
! https://help.glami.info/pixel-2.0-release-all-you-need-to-know
$removeparam=gci
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-4962768
$removeparam=pk_vid
! mindbox.ru - https://help.mindbox.ru/docs/%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8-v-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-%D1%88%D0%B0%D0%B3%D0%BE%D0%B2
$removeparam=mindbox-click-id
! https://github.com/AdguardTeam/AdguardFilters/issues/141140
! fake dating sites
click_id=*_branch_referrer=$removeparam
! https://resplend.jp/eyepudding/af2/pc/?utm_source=fing&utm_medium=ade&_buyer=5754&famad_xuid=5754,361,5368,xuidx78fca5569fx371
$removeparam=famad_xuid
! https://tsunen.team-lab.com/?twclid=2-3bhrj1ny7p11v5r9pap3anqge
$removeparam=twclid
! https://interactivead.ru/wp-content/uploads/2022/08/arir22_rkn.pdf
$removeparam=erid
! Cxense clickthrough tracking
$removeparam=cx_click
$removeparam=cx_recsOrder
$removeparam=cx_recsWidget
! Marketo email tracking
$removeparam=mkt_tok
! Mindbox email tracking
$removeparam=mindbox-message-key
! Klaviyo onsite tracking
$removeparam=_kx
! https://github.com/AdguardTeam/AdguardFilters/issues/123544
! ad click tracking
?uclick=*&uclickhash=$removeparam
/?uclick=*;uclickhash=$removeparam
&uclick=*&uclickhash=$removeparam
! PopMagic clickthrough tracking
/?r=dir&zoneid=$removeparam
/?rb=*&zoneid=$removeparam
! Adobe SiteCatalyst Campaign Tracking ID parameter
$removeparam=s_cid
! https://experienceleague.adobe.com/en/docs/target/using/integrate/a4t/a4t-faq/a4t-faq-redirect-offers#section_BA73E8B3CFCC4CBEB5BE3F76B2BC8682
$removeparam=adobe_mc_ref
$removeparam=adobe_mc_sdid
! awin.com
$removeparam=awc
! Hubspot tracking https://knowledge.hubspot.com/ads/ad-tracking-in-hubspot
$removeparam=_hsmi
$removeparam=__hsfp
$removeparam=__hssc
$removeparam=__hstc
$removeparam=_hsenc
$removeparam=hsa_acc
$removeparam=hsa_ad
$removeparam=hsa_cam
$removeparam=hsa_grp
$removeparam=hsa_kw
$removeparam=hsa_la
$removeparam=hsa_mt
$removeparam=hsa_net
$removeparam=hsa_ol
$removeparam=hsa_src
$removeparam=hsa_tgt
$removeparam=hsa_ver
$removeparam=hsCtaTracking
! Yandex Metrika
$removeparam=ysclid
$removeparam=yclid
! https://github.com/AdguardTeam/AdguardFilters/issues/120318 if ads on PC is clicked
$removeparam=aiad_clid
! https://segmentify.github.io/segmentify-dev-doc/integration_web/
$removeparam=_sgm_campaign
$removeparam=_sgm_source
$removeparam=_sgm_action
! drip.com https://help.drip.com/hc/en-us/articles/4424695632269-Suppress-s-From-Rendered-Links
! It looks like that this parameter is used not only for tracking purpose - https://github.com/AdguardTeam/AdguardFilters/issues/128631
! so to make it less problematic, it will be blocked only if contains at least 6 characters - numbers and letters
$removeparam=/^__s=[A-Za-z0-9]{6\,}/,domain=~univis.uni-erlangen.de|~univis.uni-bamberg.de|~univis.uni-luebeck.de|~univis.uni-kiel.de|~univis.th-koeln.de
! MailChimp click tracking
$removeparam=mc_cid
$removeparam=mc_eid
! moshimo affiliate
$removeparam=maf
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-2597385
$removeparam=_clde
$removeparam=_cldee
! URL Campaign Mapper
! https://documentation.mapp.com/latest/en/url-campaign-mapper-19109338.html
$removeparam=wt_mc
! https://github.com/AdguardTeam/AdguardFilters/issues/100448
! https://github.com/AdguardTeam/AdguardFilters/issues/115746
$removeparam=oprtrack
! Campaign link tracking
! https://developers.atinternet-solutions.com/as2-tagging-en/javascript-en/campaigns-javascript-en/marketing-campaigns-javascript-en/#direct-method_5
$removeparam=xtor
! Microsoft Click ID
! https://help.ads.microsoft.com/apex/index/3/en/60000
$removeparam=msclkid
! vero
$removeparam=vero_conv
$removeparam=vero_id
! ITM
! https://github.com/AdguardTeam/AdguardFilters/issues/126713
! https://www.parse.ly/help/kb/campaign-tracking-guide
! https://www.smashingmagazine.com/2017/08/tracking-internal-marketing-campaigns-google-analytics/
$removeparam=itm_source
$removeparam=itm_medium
$removeparam=itm_campaign
$removeparam=itm_content
$removeparam=itm_term
! UTM
$removeparam=utm_adgroup
$removeparam=utm_ad
$removeparam=utm_affiliate
$removeparam=utm_brand
$removeparam=utm_campaign
$removeparam=utm_campaignid
$removeparam=utm_channel
$removeparam=utm_cid
$removeparam=utm_content
$removeparam=utm_creative
$removeparam=utm_emcid
$removeparam=utm_emmid
$removeparam=utm_id
$removeparam=utm_id_
$removeparam=utm_keyword
$removeparam=utm_medium
$removeparam=utm_name
$removeparam=utm_place
$removeparam=utm_product
$removeparam=utm_pubreferrer
$removeparam=utm_reader
$removeparam=utm_referrer
$removeparam=utm_serial
$removeparam=utm_servlet
$removeparam=utm_session
$removeparam=utm_siteid
$removeparam=utm_social
$removeparam=utm_social-type
$removeparam=utm_source
$removeparam=utm_source_platform
$removeparam=utm_supplier
$removeparam=utm_swu
$removeparam=utm_term
$removeparam=utm_umguk
$removeparam=utm_userid
$removeparam=utm_viz_id
! https://support.google.com/google-ads/answer/13327296
$removeparam=gad_source
! Google ads/analytics
$removeparam=gbraid
$removeparam=wbraid
$removeparam=gclsrc
$removeparam=gclid
! Google AMP-analytics
$removeparam=usqp
! DPG Media analytics
! Used on Dutch sites
$removeparam=dpg_source
$removeparam=dpg_campaign
$removeparam=dpg_medium
$removeparam=dpg_content
! AdmitAd tracking
$removeparam=admitad_uid
! adjust.com tracking
$removeparam=gps_adid
$removeparam=unicorn_click_id
$removeparam=adjust_creative
$removeparam=adjust_tracker_limit
$removeparam=adjust_tracker
$removeparam=adjust_adgroup
$removeparam=adjust_campaign
! https://adjustsupport.force.com/helpcenter/tracking/attribution/web-attribution/track-web-campaigns
$removeparam=adjust_referrer
$removeparam=external_click_id
! https://github.com/AdguardTeam/AdguardFilters/issues/89869
! email subscriptions tracking
$removeparam=bsft_clkid
$removeparam=bsft_eid
$removeparam=bsft_mid
$removeparam=bsft_uid
$removeparam=bsft_aaid
$removeparam=bsft_ek
! Matomo/Piwik
$removeparam=mtm_campaign
$removeparam=mtm_cid
$removeparam=mtm_content
$removeparam=mtm_group
$removeparam=mtm_keyword
$removeparam=mtm_medium
$removeparam=mtm_placement
$removeparam=mtm_source
$removeparam=pk_campaign
$removeparam=pk_medium
$removeparam=pk_source
! Branch.io ( https://stackoverflow.com/questions/37882810/what-is-meaning-of-branch-match-id )
$removeparam=_branch_referrer
$removeparam=_branch_match_id
! Valuecommerce ( https://help.valuecommerce.ne.jp/mer/dl/ITP2.0_for_iTAG.pdf )
$removeparam=vc_lpp
! https://github.com/brave/brave-browser/issues/17507
$removeparam=ml_subscriber
$removeparam=ml_subscriber_hash
! Olytics
$removeparam=rb_clickid
$removeparam=oly_anon_id
$removeparam=oly_enc_id
! AD EBiS
$removeparam=ebisAdID
! Wicked Reports click tracking
$removeparam=wickedid
! https://github.com/AdguardTeam/AdguardFilters/issues/108478
$removeparam=irgwc
! Facebook analytics
$removeparam=fbclid
!
$removeparam=adfrom
$removeparam=nx_source
$removeparam=_zucks_suid
$removeparam=cmpid
$removeparam=guccounter
$removeparam=guce_referrer
$removeparam=guce_referrer_sig
$removeparam=_openstat
$removeparam=action_object_map
$removeparam=action_ref_map
$removeparam=action_type_map
$removeparam=fb_action_ids
$removeparam=fb_action_types
$removeparam=fb_comment_id
$removeparam=fb_ref
$removeparam=fb_source
!
`;

/**
 * AdGuard tracking parameters filter - specific
 * Source: https://raw.githubusercontent.com/AdguardTeam/AdguardFilters/refs/heads/master/TrackParamFilter/sections/specific.txt
 */
export const ADGUARD_SPECIFIC_TRACK_PARAMS = `
!
! This section contains the list of domain-specific rules that remove URL tracking parameters. Rules have to contain only a single modifier: \`removeparam\`.
! In some cases, it's allowed to add content type and \`$domain\` modifiers.
!
! Good: ||example.org^$removeparam=cx
! Bad: ||example.org^$xmlhttprequest,redirect=noopvast-3.0 (for instance, should be in specific.txt)
!
!
! https://github.com/AdguardTeam/AdguardFilters/issues/201849
||autodaily.ru^$removeparam=from
! Yandex.Practicum
||practicum.yandex.*$removeparam=from
! shop.asus.com
||shop.asus.com^$removeparam=campaign_id
||shop.asus.com^$removeparam=ad_id
! https://github.com/AdguardTeam/AdguardFilters/issues/201324
||read.amazon.$removeparam=ref
! bluestacks.com
||support.bluestacks.com^$removeparam=email
||support.bluestacks.com^$removeparam=guid
||support.bluestacks.com^$removeparam=oem
||support.bluestacks.com^$removeparam=client_ver
||support.bluestacks.com^$removeparam=install_id
||support.bluestacks.com^$removeparam=country
! https://github.com/AdguardTeam/AdguardFilters/issues/200852
||carwow.de^$removeparam=utm_group
||carwow.de^$removeparam=affiliate_ref
||carwow.de^$removeparam=impact_ad_id
||carwow.de^$removeparam=impact_click_id
||carwow.de^$removeparam=impact_product_sku
! unity.com
||assetstore.unity.com^$removeparam=aid
! airvpn.org
||airvpn.org^$removeparam=referred_by
! protonvpn.com
||go.getproton.me^$removeparam=aff_c
! purevpn.com
||billing.purevpn.com/aff.php$removeparam=aff
! strongvpn.com
||strongvpn.com$removeparam=tr_aid
! trustzonevpn.info
||trustzonevpn.info/r.php$removeparam=RID
! https://github.com/AdguardTeam/AdguardFilters/issues/200391
||get.surfshark.net^$removeparam=aff_c
||get.surfshark.net^$removeparam=aff_id
||get.surfshark.net^$removeparam=offer_id
! https://github.com/AdguardTeam/AdguardFilters/issues/200392
||hide.me^$removeparam=friend
! https://github.com/AdguardTeam/AdguardFilters/issues/200262
||weareholy.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/200495
||eventbrite.ca^$removeparam=aff
! accounts.adblockplus.org
||accounts.adblockplus.org^$removeparam=an
||accounts.adblockplus.org^$removeparam=av
||accounts.adblockplus.org^$removeparam=ap
||accounts.adblockplus.org^$removeparam=apv
||accounts.adblockplus.org^$removeparam=p
||accounts.adblockplus.org^$removeparam=pv
||accounts.adblockplus.org^$removeparam=s
! https://github.com/AdguardTeam/AdguardFilters/issues/199781
||engage.cloud.microsoft/main/*thread$removeparam=trk_user
||engage.cloud.microsoft/main/*thread$removeparam=trk_thread_id
||engage.cloud.microsoft/main/*thread$removeparam=trk_outlook_origin
||engage.cloud.microsoft/main/*thread$removeparam=trk_notif_id
||engage.cloud.microsoft/main/*thread$removeparam=trk_network
||engage.cloud.microsoft/main/*thread$removeparam=trk_event
||engage.cloud.microsoft/main/*thread$removeparam=trk_email_type
||engage.cloud.microsoft/main/*thread$removeparam=trk_ecs_etag
||engage.cloud.microsoft/main/*thread$removeparam=allow_app_redirect
! comic.k-manga.jp
||comic.k-manga.jp^$removeparam=xuid
||comic.k-manga.jp^$removeparam=ad
||comic.k-manga.jp^$removeparam=adtype
||comic.k-manga.jp^$removeparam=ad_flag
! https://github.com/AdguardTeam/AdguardFilters/issues/197415
||sharepoint.com^$removeparam=referrerScenario
||sharepoint.com^$removeparam=referrer
||sharepoint.com^$removeparam=xsdata
||sharepoint.com^$removeparam=sdata
||sharepoint.com^$removeparam=clickparams
||sharepoint.com^$removeparam=ovuser
||sharepoint.com^$removeparam=OR
||sharepoint.com^$removeparam=CT
||sharepoint.com^$removeparam=e
||sharepoint.com^$removeparam=CID
! https://github.com/AdguardTeam/AdguardFilters/issues/199414
||ure.pia.co.jp^$removeparam=c
! realtor.com
||realtor.com^$removeparam=rdc_visitor_id
||realtor.com^$removeparam=cid
||realtor.com^$removeparam=flow
! https://github.com/AdguardTeam/AdguardFilters/issues/198646
||meetup.com^$removeparam=eventOrigin
||meetup.com^$removeparam=recSource
||meetup.com^$removeparam=recId
||meetup.com^$removeparam=searchId
! https://kitbash3d.com
||kitbash3d.com^$removeparam=campaign_id
||kitbash3d.com^$removeparam=ad_id
! ExpressVPN
||expressvpn.com^$removeparam=xvcid
||expressvpn.com^$removeparam=shareid
! links on www.golfdigest.co.jp
||golfdigest.co.jp^$removeparam=car
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-12099447
||ho-mobile.it^$removeparam=icmp
! semrush.com
||semrush.com^$removeparam=source
! https://github.com/AdguardTeam/AdguardFilters/issues/198104
||bookshop.org^$removeparam=affiliate
! https://github.com/AdguardTeam/AdguardFilters/issues/197899
||marketplace.navitime.co.jp^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/197784
||gaming.amazon.com^$removeparam=ref_
||gaming.amazon.com^$removeparam=twitchReferral
||gaming.amazon.com^$removeparam=yTwchPos
! https://github.com/AdguardTeam/AdguardFilters/issues/197733
||allegro.pl^$removeparam=clickId
! blog.naver.com
||blog.naver.com^$removeparam=trackingCode
||blog.naver.com^$removeparam=proxyReferer
||blog.naver.com^$removeparam=referrerCode
! https://github.com/AdguardTeam/AdguardFilters/issues/197358
! https://github.com/AdguardTeam/AdguardFilters/issues/197918
||fiverr.com^$removeparam=context_referrer
||fiverr.com^$removeparam=context_type
||fiverr.com^$removeparam=filtered_price
||fiverr.com^$removeparam=funnel
||fiverr.com^$removeparam=imp_id
||fiverr.com^$removeparam=pckg_id
||fiverr.com^$removeparam=pos
||fiverr.com^$removeparam=ref_ctx_id
||fiverr.com^$removeparam=source
! https://github.com/AdguardTeam/AdguardFilters/issues/197081
||muskelmacher-shop.de$removeparam=sv_campaign_id
||muskelmacher-shop.de$removeparam=sv1
! redirecting link on mobile from mydealz.de to Metro
||rd.bizrate.com$removeparam=af_creative_id
||rd.bizrate.com$removeparam=af_assettype_id
||rd.bizrate.com$removeparam=rf_code
||rd.bizrate.com$removeparam=af_placement_id
||rd.bizrate.com$removeparam=cobrand
||rd.bizrate.com$removeparam=af_permalink_id
||rd.bizrate.com$removeparam=af_rid
||rd.bizrate.com$removeparam=af_id
||rd.bizrate.com$removeparam=bidType
||rd.bizrate.com$removeparam=bId
||rd.bizrate.com$removeparam=tokenId
||rd.bizrate.com$removeparam=dMid
||metro.*$removeparam=cnxclid
! https://ehon.alphapolis.co.jp/?from=alphapolis
||ehon.alphapolis.co.jp^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/195661
||liferbc.ru^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/196155
||luisaviaroma.com/*/p$removeparam=lvrid
! https://github.com/AdguardTeam/AdguardFilters/issues/196262
||dailymail.co.uk^$removeparam=ns_mchannel
||dailymail.co.uk^$removeparam=ns_campaign
! https://github.com/AdguardTeam/AdguardFilters/issues/195153
||vpnpay.io$removeparam=sr
||vpnpay.io$removeparam=pr
||vpnpay.io$removeparam=arf
! https://github.com/AdguardTeam/AdguardFilters/issues/194916
||fanatical.com^$removeparam=cj_pid
||fanatical.com^$removeparam=cj_aid
||fanatical.com^$removeparam=aff_track
||fanatical.com^$removeparam=CJEVENT
!
! indeed.com
! no query param is needed in such url:
! https://ca.indeed.com/cmp/Jaalatek-Design-Solutions-Inc.?from=mobviewjob&tk=1iej0ttmpjn3k80i&fromjk=6d06995b4430cdbf&attributionid=mobvjcmp
||ca.indeed.com/cmp^$removeparam=from
||ca.indeed.com/cmp^$removeparam=tk
||ca.indeed.com/cmp^$removeparam=fromjk
||ca.indeed.com/cmp^$removeparam=attributionid
! only 'jk' is needed in the url:
! https://ca.indeed.com/viewjob?jk=15a4522b76e29a15&q=full+time&l=Ontario&tk=1iej11rjbkgou89b&from=web&advn=5748246096235118&adid=438411828&ad=-6NYlbfkN0CaDkGG6htDuDKZp1WxG8u5H030IqM5pHd-LKiiIyMiAENIVrd31aATZJFK_T6vhObvePc-7o-J5eF_2RrZE5TMiFQ4RaVxfTWLFuG6xVCeuKnd8o7cr_ys966cYQJ3eqMu8YxSvY9jxHbW-WdP_77vOxIuWdxLb3-gqwCd2UdZfkHkWTIn9Hsy-snYcmGJPiZGPPwwxlDDlLWMcUuEbRGpgzDjJ4QYGpXrLXAlefZvPoJzbZLtUBHbHqyD7m96_vgBJ-nSCXTr8y7SDRm2bVXQ91G_iB4w9khBtrrOXOIw0CHO_2eAUk4BVSoVXGWPBnUTz2xHIKVLjFPU0-dWGsNAa_AhH82r6oqcGZu5436bpqvD692EvVtGeoMmFZXuHeAj84soOVDF53DM6GyXzeAJJBf4lRVWUyTKcP4SNbSI3sndetwjCoB3RfRZW1haWW6X5iFK1LxKQ9_rtUKLqdeB3y3bM5XsZzwxFMbvQL8E_Jer2oq4EBmAOy-BYf_FjrTLK3Tav4jvOZ2mwXOkwzPBQ8Bq5qBcArJSttpUurRA8CiDpyVBUOQT&pub=4a1b367933fd867b19b072952f68dceb&camk=nUmJqO2E8rj6vgsb6SFVGw%3D%3D&xkcb=SoCA6_M34TKIXNxUIp0MbzkdCdPP&xpse=SoAo6_I34TKGUKAHMT0PbzkdCdPP&xfps=e7ecf49c-0b7e-4e91-8a4a-47a96ba7f5d2&vjs=3
||ca.indeed.com/viewjob^$removeparam=tk
||ca.indeed.com/viewjob^$removeparam=from
||ca.indeed.com/viewjob^$removeparam=vjs
||ca.indeed.com/viewjob^$removeparam=cmp
||ca.indeed.com/viewjob^$removeparam=t
||ca.indeed.com/viewjob^$removeparam=q
||ca.indeed.com/viewjob^$removeparam=l
||ca.indeed.com/viewjob^$removeparam=xpse
||ca.indeed.com/viewjob^$removeparam=xfps
||ca.indeed.com/viewjob^$removeparam=xkcb
||ca.indeed.com/viewjob^$removeparam=hl
||ca.indeed.com/viewjob^$removeparam=rjptk
||ca.indeed.com/viewjob^$removeparam=advn
||ca.indeed.com/viewjob^$removeparam=adid
||ca.indeed.com/viewjob^$removeparam=ad
||ca.indeed.com/viewjob^$removeparam=sjdu
||ca.indeed.com/viewjob^$removeparam=acatk
||ca.indeed.com/viewjob^$removeparam=pub
||ca.indeed.com/viewjob^$removeparam=i2af
||ca.indeed.com/viewjob^$removeparam=camk
||ca.indeed.com/viewjob^$removeparam=jrtk
!
! https://github.com/AdguardTeam/AdguardFilters/issues/196455
||target.com^$removeparam=ref
||target.com^$removeparam=AFID
||target.com^$removeparam=fndsrc
||target.com^$removeparam=DFA
||target.com^$removeparam=adgroup
||target.com^$removeparam=LNM
||target.com^$removeparam=network
||target.com^$removeparam=device
||target.com^$removeparam=location
||target.com^$removeparam=targetid
||target.com^$removeparam=CPNG
||target.com^$removeparam=LID
! comfy.ua
||comfy.ua^$removeparam=sc_content
! https://github.com/AdguardTeam/AdguardFilters/issues/193936
||gaming.amazon.com^$removeparam=tag
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-11427733
||app.startpage.com^$removeparam=source
! https://github.com/AdguardTeam/AdguardFilters/issues/193677
||americanas.com.br^$removeparam=offerId
||americanas.com.br^$removeparam=nm_origem
||americanas.com.br^$removeparam=DCSext.recom
||americanas.com.br^$removeparam=pfm_type
||americanas.com.br^$removeparam=nm_ranking_rec
||americanas.com.br^$removeparam=pfm_carac
||americanas.com.br^$removeparam=pfm_pos
||americanas.com.br^$removeparam=pfm_page
||americanas.com.br^$removeparam=pfm_index
! hepsiburada.com
! https://github.com/AdguardTeam/AdguardFilters/issues/193713
||hepsiburada.com^$removeparam=ftid
||hepsiburada.com^$removeparam=wt_inf
! https://github.com/AdguardTeam/AdguardFilters/issues/185037
||hepsiburada.com^$removeparam=wt_ds
||hepsiburada.com^$removeparam=url_src
! https://github.com/AdguardTeam/AdguardFilters/issues/134505
||hepsiburada.com^$removeparam=wt_so
! https://github.com/AdguardTeam/AdguardFilters/issues/127888
||hepsiburada.com^$removeparam=shortlink
||hepsiburada.com^$removeparam=wt_af
||hepsiburada.com^$removeparam=wt_gl
! https://github.com/AdguardTeam/AdguardFilters/issues/193571
||moebel.de^$removeparam=visitor_id
||moebel.de^$removeparam=visitor_status
! https://github.com/AdguardTeam/AdguardFilters/issues/193113
$removeparam=cid,domain=nhk.jp|nhk.or.jp
! curalate.com
||edge.curalate.com/v1/media/$xmlhttprequest,removeparam=appId
||edge.curalate.com/v1/media/$xmlhttprequest,removeparam=fpcuid
||edge.curalate.com/v1/media/$xmlhttprequest,removeparam=rid
||edge.curalate.com/v1/img/$image,removeparam=spatialTags
! https://github.com/AdguardTeam/AdGuardSDNSFilter/pull/1785
||action.metaffiliation.com$removeparam=argsite
! https://www.rentio.jp/products/ax-n1b?click_from=top_newitems
||rentio.jp^$removeparam=click_from
! https://github.com/AdguardTeam/AdguardFilters/issues/192899
||readyfor.jp^$removeparam=sns_share_token
! https://github.com/AdguardTeam/AdguardFilters/issues/193005
||newspicks.com^$removeparam=a
||newspicks.com^$removeparam=adid
||newspicks.com^$removeparam=ref
||newspicks.com^$removeparam=block
! https://github.com/AdguardTeam/AdguardFilters/issues/192759
||wsj.com^$removeparam=mod
! https://github.com/AdguardTeam/AdguardFilters/issues/192849
||fanatical.com^$removeparam=aff_track
||fanatical.com^$removeparam=cj_pid
||fanatical.com^$removeparam=cj_aid
||fanatical.com^$removeparam=CJEVENT
! https://github.com/AdguardTeam/AdguardFilters/issues/192795
||tagomago.pl^$removeparam=subid
||tagomago.pl^$removeparam=subid1
||tagomago.pl^$removeparam=variant
||linkbux.com/track/$removeparam=uid
! https://github.com/AdguardTeam/AdguardFilters/issues/192575
||trip.com^$removeparam=trip_sub1
||trip.com^$removeparam=allianceid
! https://github.com/AdguardTeam/AdguardFilters/issues/192481
||dls.igg.com^$removeparam=media_source
||dls.igg.com^$removeparam=campaign_name
! https://github.com/AdguardTeam/AdguardFilters/issues/192448
||health.tvbs.com.tw^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/191129
||dvdfab.cn^$removeparam=trackid
! https://github.com/AdguardTeam/AdguardFilters/issues/191305
||puma.com^$removeparam=sc_src
||puma.com^$removeparam=sc_lid
||puma.com^$removeparam=sc_uid
||puma.com^$removeparam=sc_llid
||puma.com^$removeparam=sc_eh
! reddit.com
! https://github.com/AdguardTeam/AdguardFilters/issues/191029
||reddit.com^$removeparam=%243p
||reddit.com^$removeparam=%24deep_link
||reddit.com^$removeparam=post_index
! reddit.com - email tracking
||reddit.com^$removeparam=post_fullname
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-7211861
||reddit.com^$removeparam=share_id
! https://github.com/AdguardTeam/AdguardFilters/issues/94662
||reddit.com^$removeparam=correlation_id
||reddit.com^$removeparam=ref_campaign
||reddit.com^$removeparam=ref_source
||reddit.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/191029#issuecomment-2424807493
!+ PLATFORM(ext_ff)
||reddit.com^$removeparam=rdt
! https://github.com/AdguardTeam/AdguardFilters/issues/190916
||boosty.to^$removeparam=_1ld
||boosty.to^$removeparam=_1lp
||boosty.to^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/190931
||avansas.com^$removeparam=sc_src
||avansas.com^$removeparam=sc_llid
||avansas.com^$removeparam=sc_lid
||avansas.com^$removeparam=sc_uid
||avansas.com^$removeparam=sc_customer
! https://github.com/AdguardTeam/AdguardFilters/issues/190963
||keepstreams.jp/thanks-for-using-$removeparam
! kickstarter.com
||kickstarter.com$removeparam=ref
||kickstarter.com/projects$removeparam=event
||kickstarter.com/projects$removeparam=term
||kickstarter.com/projects$removeparam=total_hits
! https://github.com/brave/adblock-lists/pull/2073
||washingtonpost.com^$removeparam=itid
! https://github.com/AdguardTeam/AdguardFilters/issues/189858
||tezfiles.com$removeparam=site
! https://github.com/AdguardTeam/AdguardFilters/issues/190134
||calciomatome.net$removeparam=seesaa_related
! https://github.com/AdguardTeam/AdguardFilters/issues/189843
||smocca.jp^$removeparam=cb_ref_code
! https://github.com/AdguardTeam/AdguardFilters/issues/189871
||rtrp.jp^$removeparam=p_s
! https://lidea.today/campaign/kireikirei_wchance_eraberupaycp2409/index?from=top_promotion02_kireikirei_wchance_eraberupaycp2409
||lidea.today^$removeparam=from
! change.org
||change.org^$removeparam=source_location
||change.org^$removeparam=user_flow
! https://github.com/AdguardTeam/AdguardFilters/issues/189164
||rbc.ru^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/189086
||fontanka.ru^$removeparam=from
! LiveIntent
||p.liadm.com/click?s=$removeparam=i6
||p.liadm.com/click?s=$removeparam=_lc2_fpi
||p.liadm.com/click?s=$removeparam=stpe
||p.liadm.com/click?s=$removeparam=li
!
! Microsoft
||msn.com^$removeparam=pc
||msn.com^$removeparam=ei
||microsoft.com^$removeparam=ranEAID
||microsoft.com^$removeparam=ranSiteID
||microsoft.com^$removeparam=ocid
$removeparam=nclid,domain=microsoft.com
$removeparam=cvid,domain=microsoft.com|msn.com|bing.com,document
$removeparam=epi,domain=microsoft.com|xbox.com
$removeparam=FORM,domain=bing.com
!
! https://github.com/AdguardTeam/AdguardFilters/issues/188889
$removeparam=sub_rt,domain=comemo.nikkei.com|diehardtales.com|greenplanet.kaneka.co.jp|j-yokatsu2.edu.city.uruma.okinawa.jp|labo.rheos.jp|note-harumi.sbfoods.co.jp|note.basicinc.jp|note.bcnretail.com|note.calbee.jp|note.com|note.gallery.intage.com|note.kogakuin.ac.jp|note.jp|note.minne.com|note.montblanc.design|note.nhkso.or.jp|note.pokkasapporo-fb.jp|note.roxx.co.jp|note.smartnews-ads.com|note.universal-music.co.jp|note.yamap.com|note.zochang.com|refalover-note.mainichi.jp|shanaiho.itandi.co.jp|uragawa-note.jpn.panasonic.com|webtripper.jp
! https://github.com/AdguardTeam/AdguardFilters/issues/188662
||undressher.app^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/188510
||xingga.com^$removeparam=showid
! https://github.com/AdguardTeam/AdguardFilters/issues/188457
||h-taikendan.net^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/188235
||camp-fire.jp/projects/*/view$removeparam=list
! privatbank.ua
||privatbank.ua^$removeparam=utm_addrid
||privatbank.ua^$removeparam=utm_jeref
||privatbank.ua^$removeparam=utm_positionUrl
! https://github.com/AdguardTeam/AdguardFilters/issues/188328
||baseballchannel.jp^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/188015
||money.smt.docomo.ne.jp^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/187893
||store.shopping.yahoo.co.jp^$removeparam=sc_i
! https://github.com/AdguardTeam/AdguardFilters/issues/187866
||kwiky.com^$removeparam=AFNO
! https://github.com/AdguardTeam/AdguardFilters/issues/187874
||ai-porn.ai^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/187863
||camsoda.com^$removeparam=id
! https://github.com/AdguardTeam/AdguardFilters/issues/188010
||aeza.net^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/187850
||gptgirlfriend.online^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/187852
||fantasygf.ai^$removeparam=linkId
! https://github.com/AdguardTeam/AdguardFilters/issues/187859
||pornjourney.ai^$removeparam=referral
! https://github.com/AdguardTeam/AdguardFilters/issues/187861
||land.muah.ai^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/187870
||getidol.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/187871
||pornx.ai^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/187626
||vodafone.com.tr^$removeparam=tracking_cid
! https://github.com/AdguardTeam/AdguardFilters/issues/187868
||juicy-ai.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/187873
||angelgf.com^$removeparam=via
! https://github.com/AdguardTeam/AdguardFilters/issues/187865
||slushy.com^$removeparam=af
! https://github.com/AdguardTeam/AdguardFilters/issues/187853
||deepmode.com^$removeparam=fpr
! https://github.com/AdguardTeam/AdguardFilters/issues/187846
||candy.ai^$removeparam=cid
! https://github.com/AdguardTeam/AdguardFilters/issues/187917
||darkroomvr.com^$removeparam=nats
! rozetka.com.ua
||rozetka.com.ua^$removeparam=afclid
! https://github.com/AdguardTeam/AdguardFilters/issues/187661
||aliexpress.com^$removeparam=algo_exp_id
||aliexpress.com^$removeparam=utparam-url
! https://github.com/AdguardTeam/AdguardFilters/issues/187006
||temu.com^$removeparam=_p_jump_id
||temu.com^$removeparam=_x_vst_scene
||temu.com^$removeparam=_p_rfs
||temu.com^$removeparam=_x_ads_channel
||temu.com^$removeparam=_x_ads_sub_channel
||temu.com^$removeparam=_x_campaign
||temu.com^$removeparam=_x_cid
||temu.com^$removeparam=g_site
||temu.com^$removeparam=g_lg
||temu.com^$removeparam=g_region
||temu.com^$removeparam=g_ccy
||temu.com^$removeparam=refer_page_el_sn
||temu.com^$removeparam=refer_page_sn
! https://github.com/AdguardTeam/AdguardFilters/issues/186605
||vedomosti.ru^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/186609
||cyber.sports.ru^$removeparam=p_a
||cyber.sports.ru^$removeparam=p_n
||cyber.sports.ru^$removeparam=p_c
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-10369341
||walmart.com^$removeparam=from
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-10267760
||audible.$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/185385
||camcam.cc^$removeparam=ref
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-10238857
ref=producthunt^$removeparam=ref
! igromania.ru
||igromania.ru^$removeparam=from_button_waterfall_knb
! https://github.com/AdguardTeam/AdguardFilters/issues/185179
||fikfapcams.com^$removeparam=referrer
||fikfapcams.com^$removeparam=realDomain
||fikfapcams.com^$removeparam=affiliateId
||go.xliirdr.com/?*&targetDomain=$removeparam=p
||go.xliirdr.com/?*&targetDomain=$removeparam=userId
||go.xliirdr.com/?*&targetDomain=$removeparam=campaignId
! https://github.com/AdguardTeam/AdguardFilters/issues/185036
||windscribe.com^$removeparam=pcpid
||windscribe.com^$removeparam=temp_session
! https://github.com/AdguardTeam/AdguardFilters/issues/184903
||samsung.com^$removeparam=cid
! https://www.nikkansports.com/premium/baseball/news/202407140001516.html?nsgid=(random char)
||nikkansports.com^$removeparam=nsgid
! https://github.com/AdguardTeam/AdguardFilters/issues/184837
||game.hiroba.dpoint.docomo.ne.jp^$removeparam=mks_referer_event
! https://news.yahoo.co.jp/articles/ca5b45b1e27e871071e6fd94be02f630884371c8?source=sns&dv=pc&mid=other&date=20240728&ctg=it&bt=tw_up
||news.yahoo.co.jp^$removeparam=source
||news.yahoo.co.jp^$removeparam=dv
||news.yahoo.co.jp^$removeparam=mid
||news.yahoo.co.jp^$removeparam=date
||news.yahoo.co.jp^$removeparam=ctg
||news.yahoo.co.jp^$removeparam=bt
! lumosvpn.com promo
||lumosvpn.com/?cep=$removeparam
! https://github.com/AdguardTeam/AdguardFilters/issues/184386
||shop.adidas.jp^$removeparam=source_caller
||shop.adidas.jp^$removeparam=shortlink
! https://github.com/AdguardTeam/AdguardFilters/issues/184272
||daohang.qq.com^$removeparam=fr
! https://github.com/AdguardTeam/AdguardFilters/issues/183694
||hoyoverse.com/branding$removeparam
! https://github.com/AdguardTeam/AdguardFilters/issues/183361
||cloud.baidu.com^$removeparam=from
||qianfan.cloud.baidu.com^$removeparam=track
! https://github.com/AdguardTeam/AdguardFilters/issues/183138
||qjweb.jp^$removeparam=from
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-9964278
||sport.sky.it^$removeparam=social
||sport.sky.it^$removeparam=share_id
! https://github.com/AdguardTeam/AdguardFilters/issues/182791
||tokopedia.com^$removeparam=src
||tokopedia.com^$removeparam=extParam
||tokopedia.com^$removeparam=refined
! https://github.com/AdguardTeam/AdguardFilters/issues/182681
||darkfans.com^$removeparam=ref
||darkfans.com^$removeparam=af
! https://github.com/AdguardTeam/AdguardFilters/issues/182682
||porntube.com^$removeparam=cid
! https://github.com/AdguardTeam/AdguardFilters/issues/182683
||3movs.com^$removeparam=site_id
! https://jpsk.jp/articles/kanoa2.html?click=popup
||jpsk.jp^$removeparam=click
! https://github.com/AdguardTeam/AdguardFilters/issues/182402
||savefrom.net^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/182247
$removeparam=from,domain=doujinnomori.com|shinshi-manga.net|echiman.com|dojin-navi.com
! https://github.com/AdguardTeam/AdguardFilters/issues/182182
||temu.com^$removeparam=_bg_fs
||temu.com^$removeparam=_x_sessn_id
||temu.com^$removeparam=refer_page_name
||temu.com^$removeparam=refer_page_id
||temu.com^$removeparam=sku_id
||temu.com^$removeparam=refer_share_channel
||temu.com^$removeparam=refer_share_id
||temu.com^$removeparam=_oak_page_source
||temu.com^$removeparam=_oak_region
||temu.com^$removeparam=refer_share_suin
||temu.com^$removeparam=_oak_mp_inf
||temu.com^$removeparam=top_gallery_url
||temu.com^$removeparam=spec_gallery_id
||temu.com^$removeparam=refer_source
||temu.com^$removeparam=freesia_scene
||temu.com^$removeparam=_oak_freesia_scene
||temu.com^$removeparam=_oak_rec_ext_1
||temu.com^$removeparam=_oak_gallery_order
||temu.com^$removeparam=_x_channel_scene
||temu.com^$removeparam=_x_channel_src
||temu.com^$removeparam=share_img
||temu.com^$removeparam=from_share
! https://github.com/AdguardTeam/AdguardFilters/issues/182154
||videoproc.com/*install/$removeparam
! https://github.com/AdguardTeam/AdguardFilters/issues/182138
||m.otenki.com^$removeparam=af
! https://www.carseven.co.jp/assess?from=contents_floating
||carseven.co.jp^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/181725
||email1.io^$removeparam=aid
! https://github.com/AdguardTeam/AdguardFilters/issues/181404
||blogmura.com^$removeparam=p_cid
! https://github.com/AdguardTeam/AdguardFilters/issues/181299
||nvidia.com^$removeparam=jso
! https://github.com/AdguardTeam/AdguardFilters/issues/180304
||nytimes.com^$removeparam=smid
||nytimes.com^$removeparam=referringSource
||nytimes.com^$removeparam=sgrp
||nytimes.com^$removeparam=impression_id
! https://github.com/AdguardTeam/AdguardFilters/issues/180890
||shimotsuke.co.jp^$removeparam=rankinghour
||shimotsuke.co.jp^$removeparam=top
||shimotsuke.co.jp^$removeparam=newsletter
||shimotsuke.co.jp^$removeparam=relatedarticle
||shimotsuke.co.jp^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/180896
||boncharge.com^$removeparam=shpxid
! https://github.com/AdguardTeam/AdguardFilters/issues/180000
||plarium.com/landings/$removeparam
! https://github.com/AdguardTeam/AdguardFilters/issues/180785
||lancasterarchery.com^$removeparam=af_lnk
||lancasterarchery.com^$removeparam=dt_id
! https://github.com/AdguardTeam/AdguardFilters/issues/179379
||lenta.ru^$removeparam=es
! https://github.com/AdguardTeam/AdguardFilters/issues/179934
||finance.yahoo.co.jp^$removeparam=cpt_m
||finance.yahoo.co.jp^$removeparam=cpt_n
||finance.yahoo.co.jp^$removeparam=cpt_s
||sbisec.co.jp^$removeparam=waad
! https://github.com/AdguardTeam/AdguardFilters/issues/179524
||ejje.weblio.jp^$removeparam=erl
! https://qjweb.jp/news/105411/?from=sidebar
||qjweb.jp^$removeparam=from
! https://map.yahoo.co.jp/v2/place/ihEL4xYIVAo?from_srv=loco_web
||map.yahoo.co.jp^$removeparam=from_srv
! https://github.com/AdguardTeam/AdguardFilters/issues/178806
||protonvpn.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/178786
||quora.com^$removeparam=share
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-9264793
||tcgplayer.com^$removeparam=source
! https://github.com/AdguardTeam/AdguardFilters/issues/178109
||kyujin.navitime.co.jp^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/178001
||avira.com^$removeparam=track
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-9118227
||foodpanda.$removeparam=src
! https://github.com/AdguardTeam/AdguardFilters/issues/176856
||plusgaming.yandex.ru^$removeparam=clckid
! https://github.com/AdguardTeam/AdguardFilters/issues/176307
||iotransfer.itopvpn.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/175941
||tradingview.com^$removeparam=exchange
||tradingview.com^$removeparam=aff_id
||tradingview.com^$removeparam=aff_sub
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8834544
||tmz.com^$removeparam=adid
! https://github.com/AdguardTeam/AdguardFilters/issues/174921
||substack.com$removeparam=triedRedirect
! https://github.com/AdguardTeam/AdguardFilters/issues/175100
||m.weathercn.com^$removeparam=partner
||m.weathercn.com^$removeparam=id
||m.weathercn.com^$removeparam=p_source
||m.weathercn.com^$removeparam=p_type
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8785529
?ref=awesometechstack.com$removeparam=ref
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8754160
||freebies.indiegala.com^$removeparam=ref
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8721233
||qzone.qq.com^$removeparam=loginfrom
||urlshare.cn^$removeparam=apptype
||urlshare.cn^$removeparam=loginuin
||urlshare.cn^$removeparam=plateform
||urlshare.cn^$removeparam=src_uin
||urlshare.cn^$removeparam=srctype
! https://github.com/AdguardTeam/AdguardFilters/issues/173941
||crunchyroll.com^$removeparam=referrer
! https://github.com/AdguardTeam/AdguardFilters/issues/173987
||zapiska.substack.com^$removeparam=publication_id
||zapiska.substack.com^$removeparam=post_id
||zapiska.substack.com^$removeparam=r
! https://github.com/AdguardTeam/AdguardFilters/issues/173471
||youtu.be^$removeparam=si
! https://github.com/AdguardTeam/AdguardFilters/issues/173807
||eplus.by^$removeparam=de_utm_source
! https://github.com/AdguardTeam/AdguardFilters/issues/173600
||travelist.pl^$removeparam=MWID
||perfo.salestube.pl^$removeparam=aff_click_id
||clickserve.dartsearch.net^$removeparam=lid
||clickserve.dartsearch.net^$removeparam=ds_s_kwgid
! https://github.com/AdguardTeam/AdguardFilters/issues/173056
||rakumachi.jp^$removeparam=device_type
||rakumachi.jp^$removeparam=uiaid
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8505558
||carousell.*$removeparam=t-id
||carousell.*$removeparam=t-referrer_browse_type
||carousell.*$removeparam=t-referrer_category_id
||carousell.*$removeparam=t-referrer_page_type
||carousell.*$removeparam=t-referrer_request_id
||carousell.*$removeparam=t-referrer_search_query
||carousell.*$removeparam=t-referrer_search_query_source
||carousell.*$removeparam=t-referrer_sort_by
||carousell.*$removeparam=t-referrer_source
||carousell.*$removeparam=t-source
||carousell.*$removeparam=t-tap_index
! Uber
||ubereats.com^$removeparam=campaign
||ubereats.com^$removeparam=sub-campaign
||ubereats.com^$removeparam=marketing-visitor-id
||uber.com^$removeparam=uclick_id
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8479998
||controld.com^$removeparam=cid
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8455734
?ref=upstract.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/172125
||prothomalo.com^$cookie=uuid_v2
! Wargaming tracking
||track.wargaming-aff.com/click?pid=$removeparam=ref_id
||trck.wargaming.net^$removeparam
||join.worldoftanks.eu^$removeparam
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8368863
||streamable.com^$removeparam=src_internal
||streamable.com^$removeparam=src_player
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-8282562
||smartrecruiters.com^$removeparam=km_adgroup
||smartrecruiters.com^$removeparam=km_matchtype
||smartrecruiters.com^$removeparam=km_partner
! https://github.com/AdguardTeam/AdguardFilters/issues/171822
||nuuvem.com^$removeparam=ranMID
||nuuvem.com^$removeparam=ranEAID
||nuuvem.com^$removeparam=ranSiteID
! https://github.com/AdguardTeam/AdguardFilters/issues/171802
||gog.com^$removeparam=pp
! https://github.com/AdguardTeam/AdguardFilters/issues/171289
||chitai-gorod.ru^$removeparam=partnerId
! https://mall.kinarino.jp/sale?sort=popular&available=on&cid=group_knrn_presses-show&kcat=2&kkw=107_1046_8394_11659&klay=presses-show&karea=feature-banner
||mall.kinarino.jp^$removeparam=karea
||mall.kinarino.jp^$removeparam=klay
! https://github.com/AdguardTeam/AdguardFilters/issues/170633
||ilsecoloxix.it^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/170635#issuecomment-1890590521
||gelocal.it^$removeparam=ref
||gelocal.it^$removeparam=cnt
! https://github.com/AdguardTeam/AdguardFilters/issues/170366
||allabout.co.jp^$removeparam=FM
! https://mora.jp/special/bigsale/?fmid=mora.jack_202312_bigsale
||mora.jp^$removeparam=fmid
! https://github.com/AdguardTeam/AdguardFilters/issues/169585
! https://github.com/AdguardTeam/AdguardFilters/issues/178863
||dvdfab.org^$removeparam=soft
||dvdfab.org^$removeparam=ad
||dvdfab.org^$removeparam=ver
||dvdfab.org^$removeparam=clientusertype
||dvdfab.org^$removeparam=client_e
||dvdfab.org^$removeparam=c_ex
||dvdfab.org^$removeparam=c_id
! go2jump.org / tr.rdrtr.com
||rdrtr.com^$removeparam=source
||rdrtr.com^$removeparam=aff_sub
||rdrtr.com^$removeparam=aff_sub2
||rdrtr.com^$removeparam=aff_sub3
||rdrtr.com^$removeparam=aff_sub4
||rdrtr.com^$removeparam=aff_sub5
! https://github.com/AdguardTeam/AdguardFilters/issues/168508#issuecomment-1872568599
||duckduckgo.com/y.js$removeparam=ad_domain
||duckduckgo.com/y.js$removeparam=ad_provider
||duckduckgo.com/y.js$removeparam=ad_type
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-7975883
||indeed.com^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/169365
||plus.yandex.*^$removeparam=source
||plus.yandex.*^$removeparam=state
||plus.yandex.*^$removeparam=origin
! boredpanda.com
||boredpanda.com^$removeparam=cexp_id
||boredpanda.com^$removeparam=cexp_var
! https://github.com/AdguardTeam/AdguardFilters/issues/169023
||ziprecruiter.com^$removeparam=zrclid
! huffingtonpost.it
||huffingtonpost.it^$removeparam=cnt
||huffingtonpost.it^$removeparam=ref
! https://reservation.oh-my-teeth.com/scan?tags=blog_lp102-3cp_monitor_pcFixed&clid=about-orthodontics&code=M10000
||oh-my-teeth.com^$removeparam=clid
! https://olegmakarenko.ru/?from=sds
||olegmakarenko.ru^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/168475
||dragonquest.jp^$removeparam=_bdld
! https://raretech.site/about?from=envader-/assets/banner/banner-5.jpg
||raretech.site^$removeparam=from
! dtf.ru tracking
||booster.osnova.io^$removeparam=place
||booster.osnova.io^$removeparam=boosterUid
! https://github.com/AdguardTeam/AdguardFilters/issues/168286
||smotreshka.tv^$removeparam=from
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-7715888
||announcements.bybit.com^$removeparam=pid
||announcements.bybit.com^$removeparam=sa_utm_ci
||announcements.bybit.com^$removeparam=sa_utm_channel
||announcements.bybit.com^$removeparam=sa_utm_tcn
! https://github.com/AdguardTeam/AdguardFilters/issues/167273
||game-i.daa.jp/?cmd=ad_mode$removeparam=cmd
! https://github.com/AdguardTeam/AdguardFilters/issues/167051
||slickdeals.net^$removeparam=sdtrk
||slickdeals.net^$removeparam=attr_track
||slickdeals.net^$removeparam=trd
||slickdeals.net^$removeparam=sdtid
||slickdeals.net^$removeparam=prop
||slickdeals.net^$removeparam=pv
||slickdeals.net^$removeparam=au
||slickdeals.net^$removeparam=peid
||slickdeals.net^$removeparam=adobeRef
||slickdeals.net^$removeparam=attrsrc
||slickdeals.net^$removeparam=src
||slickdeals.net/*&sdpid=$removeparam=sdpid
||slickdeals.net/*&sdfid=$removeparam=sdfid
||slickdeals.net/*&sdtrk=$removeparam=sdtrk
! https://github.com/AdguardTeam/AdguardFilters/issues/167158
||beacon-recommend.tower.jp^$removeparam=tracking_id
! https://github.com/AdguardTeam/AdguardFilters/issues/166502
||hd.kinopoisk.ru^$removeparam=from_block
! https://github.com/AdguardTeam/AdguardFilters/issues/166917
||bizhint.jp^$removeparam=trcd
! https://github.com/AdguardTeam/AdguardFilters/issues/166582
||teknosa.com^$removeparam=adj_adgroup
||teknosa.com^$removeparam=adj_campaign
||teknosa.com^$removeparam=adj_creative
||teknosa.com^$removeparam=adj_t
||teknosa.com^$removeparam=adp_cid
||teknosa.com^$removeparam=adp_oid
||teknosa.com^$removeparam=shopId
! https://github.com/AdguardTeam/AdguardFilters/issues/166698
||stacksocial.com/*/*&partnerid=$removeparam=partnerid
! https://github.com/AdguardTeam/AdguardFilters/issues/166636
||gillian-guide.github.io^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/166436
||pcmag.com^$removeparam=taid
!
! VK Group
! VKontakte
$removeparam=trackcode,domain=vk.com|vk.ru
$removeparam=recom,domain=vk.com|vk.ru
! vkplay.ru
||vkplay.ru$removeparam=_1ld
||vkplay.ru$removeparam=_1lp
||vkplay.ru^$removeparam=mt_adset
||vkplay.ru^$removeparam=mt_sub1
||vkplay.ru^$removeparam=mt_sub2
!
! https://github.com/AdguardTeam/AdguardFilters/issues/166050
||incogni.com^$removeparam=transaction_id
||incogni.com^$removeparam=offer_id
||incogni.com^$removeparam=affiliate_id
||incogni.com^$removeparam=aff_sub
||incogni.com^$removeparam=source
! https://github.com/AdguardTeam/AdguardFilters/issues/165785
! Do not remove "shareKey" parameter - https://github.com/AdguardTeam/AdguardFilters/issues/171962
||coolapk.com^$removeparam=shareUid
||coolapk.com^$removeparam=shareFrom
! sportbank.ua spam
||sportbank.ua^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/165339
keepstreams.com^$removeparam=c_app
keepstreams.com^$removeparam=client_m
keepstreams.com^$removeparam=c_sys
keepstreams.com^$removeparam=c_dt
keepstreams.com^$removeparam=c_wh
keepstreams.com^$removeparam=c_ad
keepstreams.com^$removeparam=c_ver
keepstreams.com^$removeparam=soft
keepstreams.com^$removeparam=ad
keepstreams.com^$removeparam=downloadmode
! https://github.com/AdguardTeam/AdguardFilters/issues/165022
||newspicks.com^$removeparam=ref
||newspicks.com^$removeparam=ref_t
! https://github.com/AdguardTeam/AdguardFilters/issues/164620
||streamfab.jp^$removeparam=soft
||streamfab.jp^$removeparam=ad
||streamfab.jp^$removeparam=c_try
||streamfab.jp^$removeparam=c_bm
||streamfab.jp^$removeparam=c_app
||streamfab.jp^$removeparam=c_sys
||streamfab.jp^$removeparam=c_ver
||streamfab.jp^$removeparam=c_ut
||streamfab.jp^$removeparam=c_app_from
||streamfab.jp^$removeparam=c_dt
||streamfab.jp^$removeparam=c_wh
! https://github.com/AdguardTeam/AdguardFilters/issues/164060#issuecomment-1779661046
! https://github.com/AdguardTeam/AdguardFilters/issues/111997
||ozon.ru^$removeparam=__rr
||ozon.ru^$removeparam=abt_att
||ozon.ru^$removeparam=asb
||ozon.ru^$removeparam=advert
||ozon.ru^$removeparam=asb2
||ozon.ru^$removeparam=avtc
||ozon.ru^$removeparam=avte
||ozon.ru^$removeparam=avts
||ozon.ru^$removeparam=from_url
||ozon.ru^$removeparam=from_sku
||ozon.ru^$removeparam=keywords
! https://github.com/AdguardTeam/AdguardFilters/issues/164394
||stvkr.com/v*/click-$removeparam=sa
||stvkr.com/v*/click-$removeparam=rfr
||stvkr.com/v*/click-$removeparam=widht
||stvkr.com/v*/click-$removeparam=height
||stvkr.com/v*/click-$removeparam=timezone
||dashboard.wedare.pl^$removeparam=smc1
||dashboard.wedare.pl^$removeparam=smc2
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-7337134
||cmswire.com^$removeparam=source
! damu.net homepage - Visit https://www.daum.net/ and click one of news feed.
||v.daum.net^$removeparam=x_imp
||v.daum.net^$removeparam=x_hk
! https://github.com/AdguardTeam/AdguardFilters/issues/163568
!$removeparam=af_id,domain=dmm.co.jp|dmm.com
$removeparam=dmmref,domain=dmm.co.jp|dmm.com
$removeparam=i3_ref,domain=dmm.co.jp|dmm.com
$removeparam=i3_ord,domain=dmm.co.jp|dmm.com
! https://github.com/AdguardTeam/AdguardFilters/issues/163365
||mootoon.co.kr$removeparam=in_id
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-7207755
||researchgate.net^$removeparam=_tp
! https://github.com/DandelionSprout/adfilt/discussions/163?notification_referrer_id=MDE4Ok5vdGlmaWNhdGlvblRocmVhZDE2NDIwMDY1NDA6NTg5MDA1OTg%3D#discussioncomment-7198771
||peacocktv.com^$removeparam=orig_ref
||peacocktv.com^$removeparam=method
! https://github.com/AdguardTeam/AdguardFilters/issues/163239
! _csrc_, _cus_ and _cut_ are reproducible when you download their Windows app at Japanese langauge webpage.
||streamfab.*^$removeparam=_csrc_
||streamfab.*^$removeparam=_cus_
||streamfab.*^$removeparam=_cut_
||streamfab.*^$removeparam=c_ad
||streamfab.*^$removeparam=client_t
||streamfab.*^$removeparam=client_m
! https://slack.com/downloads/linux?t=[Slack channel ID]
||slack.com/downloads/$removeparam=t
! Naver Shopping - click an item at its search result webpage.
$removeparam=frm,domain=msearch.shopping.naver.com|search.shopping.naver.com
$removeparam=NaPm,domain=msearch.shopping.naver.com|search.shopping.naver.com
! DuckDuckGo
! https://duckduckgo.github.io/duckduckgo-help-pages/privacy/atb/
! breaks redirect when their Extension is installed - https://github.com/AdguardTeam/AdguardFilters/issues/161751
! ||duckduckgo.com^$removeparam=atb
||duckduckgo.com^$removeparam=from
||duckduckgo.com^$removeparam=vis
||duckduckgo.com^$removeparam=perf_id
||duckduckgo.com^$removeparam=parent_perf_id
! https://github.com/AdguardTeam/AdguardFilters/issues/162037
||tutanota.com^$removeparam=t-src
! donga.com - click an article at its main homepage. https://www.donga.com/
||donga.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/162001
||t.adcell.com/*?$removeparam=subId
||track.webgains.com/click.html?$removeparam=clickref
$removeparam=bid,domain=fafit24.de
$removeparam=adcref,domain=fafit24.de
$removeparam=cvrid,domain=decathlon.pl
$removeparam=cvrpid,domain=decathlon.pl
$removeparam=cvrsid,domain=decathlon.pl
$removeparam=tag3,domain=ibood.com|decathlon.pl
$removeparam=wgu,domain=ibood.com|decathlon.pl
$removeparam=wgexpiry,domain=ibood.com|decathlon.pl
! https://github.com/AdguardTeam/AdguardFilters/issues/162003
||rapidgator.net^$removeparam=referer
! https://github.com/AdguardTeam/AdguardFilters/issues/161972
||donation.yahoo.co.jp^$removeparam=cpt_n
||donation.yahoo.co.jp^$removeparam=cpt_s
||donation.yahoo.co.jp^$removeparam=cpt_m
||donation.yahoo.co.jp^$removeparam=cpt_c
! tinkoff.ru
||tinkoff.ru^$removeparam=dsp_click_id
! https://github.com/AdguardTeam/AdguardFilters/issues/161229
||yahoo.co.jp^$removeparam=ikCo
||yahoo.co.jp^$removeparam=sc_e
! https://github.com/AdguardTeam/AdguardFilters/issues/161441
||happymail.co.jp^$removeparam=Log
! Youtube
$removeparam=embeds_referring_euri,domain=youtubekids.com|youtube-nocookie.com|youtube.com
$removeparam=embeds_referring_origin,domain=youtubekids.com|youtube-nocookie.com|youtube.com
$removeparam=source_ve_path,domain=youtubekids.com|youtube-nocookie.com|youtube.com
||youtube.com^$removeparam=pp
! https://github.com/AdguardTeam/AdguardFilters/issues/161013
||gotanynudes.com^$removeparam=ref
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6932203
||nitter.net^$removeparam=referer
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6908261
||gitlab.$removeparam=referrer_action
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6908266
||gitlab.$removeparam=glm_source
||gitlab.$removeparam=glm_content
! streamfab.jp
||streamfab.jp^$removeparam=trackid
! etsy.com
||etsy.com^$removeparam=click_key
||etsy.com^$removeparam=ref
||etsy.com^$removeparam=click_sum
! https://github.com/AdguardTeam/AdguardFilters/issues/160495
||myprotein.jp^$removeparam=affil
||myprotein.jp^$removeparam=a8
! https://github.com/AdguardTeam/AdguardFilters/issues/159733
||email.nationalgeographic.com^$removeparam=__F__
||email.nationalgeographic.com^$removeparam=__dU__
! https://www.pixiv.net/novel/?novel13th_character_count_checker&from=pixiv_official_post
||pixiv.net^$removeparam=from
! https://querie.me/answer/t008mMA55hMnREySBJXZ?timestamp=1692022485
||querie.me^$removeparam=timestamp
! https://github.com/AdguardTeam/AdguardFilters/issues/159072
mailchimp.com$removeparam=amp%3Butm_medium
mailchimp.com$removeparam=amp%3Butm_campaign
mailchimp.com$removeparam=amp%3Baid
mailchimp.com$removeparam=amp%3Bafl
!
! wetransfer.com
! https://github.com/AdguardTeam/AdguardFilters/issues/192651
||wetransfer.com^$removeparam=t_lsid
||wetransfer.com^$removeparam=t_rid
||wetransfer.com^$removeparam=t_exp
||wetransfer.com^$removeparam=t_ts
! https://github.com/AdguardTeam/AdguardFilters/issues/158205
||wetransfer.com^$removeparam=trk
||wetransfer.com^$removeparam=amp;utm_campaign
||wetransfer.com^$removeparam=amp;utm_medium
||wetransfer.com^$removeparam=amp;utm_source
! https://github.com/AdguardTeam/AdguardFilters/issues/158209
||wetransfer.zendesk.com^$removeparam=amp%3Btrk
||wetransfer.zendesk.com^$removeparam=amp%3Btoken
||wetransfer.zendesk.com^$removeparam=amp%3Butm_campaign
||wetransfer.zendesk.com^$removeparam=amp%3Butm_source
||wetransfer.zendesk.com^$removeparam=amp%3Butm_medium
!
! https://github.com/AdguardTeam/AdguardFilters/issues/158251
||douyin.com^$removeparam=extra_params
||douyin.com^$removeparam=previous_page
! https://github.com/uBlockOrigin/uAssets/issues/19320
||bandcamp.com^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/158548
||dvdfab.org^$removeparam=trackid
||dvdfab.org^$removeparam=c_ad
||dvdfab.org^$removeparam=c_app
||dvdfab.org^$removeparam=c_app_from
||dvdfab.org^$removeparam=c_bm
||dvdfab.org^$removeparam=c_dt
||dvdfab.org^$removeparam=c_sys
||dvdfab.org^$removeparam=c_u
||dvdfab.org^$removeparam=c_ut
||dvdfab.org^$removeparam=c_ver
||dvdfab.org^$removeparam=c_wh
||dvdfab.org^$removeparam=client_m
||dvdfab.org^$removeparam=client_t
! wikipedia.org
! https://wikitech.wikimedia.org/wiki/Provenance
||wikipedia.org^$removeparam=wprov
! sportschosun.com - Click an internal article in their website.
||sportschosun.com^$removeparam=f_url
! https://github.com/AdguardTeam/AdguardFilters/issues/157492
||clickfunnels.com^$removeparam=aff_sub
! https://github.com/AdguardTeam/AdguardFilters/issues/157052
||promote.betcity.ru^$removeparam=widget_id
||promote.betcity.ru^$removeparam=refcode
||promote.betcity.ru^$removeparam=icm
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6532073
||linkedin.com/feed/update$removeparam=origin
! yna.co.kr - Click an internal article in their website.
||yna.co.kr^$removeparam=site
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6514228
||easyfundraising.org.uk^$removeparam=efr_campaign
||easyfundraising.org.uk^$removeparam=efr_medium
||easyfundraising.org.uk^$removeparam=efr_source
! https://github.com/AdguardTeam/AdguardFilters/issues/156979
||blogtrottr.com^$removeparam=lctg
! https://github.com/AdguardTeam/AdguardFilters/issues/156855
||wowma.jp^$removeparam=wadd
! https://github.com/AdguardTeam/AdguardFilters/issues/156781
||mypage.otsuka-shokai.co.jp^$removeparam=oiid
! https://github.com/AdguardTeam/AdguardFilters/issues/156784
||hatalike.jp^$removeparam=track
! https://ieagent.jp/?ref=hm&cv=floatingbanner&ref=hm&p=ikkenyachintai-yametahougaii-115525&ct=img&cv=Rooch_pc-floatingbanner.jpg
||ieagent.jp^$removeparam=ct
||ieagent.jp^$removeparam=cv
||ieagent.jp^$removeparam=p
||ieagent.jp^$removeparam=ref
! doda.jp trackparams
||doda.jp^$removeparam=fm
||doda.jp^$removeparam=from
||doda.jp^$removeparam=recommendID
||doda.jp^$removeparam=usrclk
||doda.jp^$removeparam=usrclk_searchListCassette
! https://www.hatarako.net/fukuoka/?prelink=allmaplink
||hatarako.net^$removeparam=prelink
! https://github.com/AdguardTeam/AdguardFilters/issues/156147
||myoji-kamon.net^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/155994
||zozo.jp^$removeparam=t
! https://github.com/AdguardTeam/AdguardFilters/issues/155766
||am730.com.hk^$removeparam=ncid
! https://github.com/AdguardTeam/AdguardFilters/issues/155138
||roboform.com^$removeparam=frm
||roboform.com^$removeparam=affid
||roboform.com^$removeparam=a
||roboform.com^$removeparam=c
||roboform.com^$removeparam=s1
! https://github.com/AdguardTeam/AdguardFilters/issues/163040
! https://github.com/AdguardTeam/AdguardFilters/issues/155405
||shareasale-analytics.com^$removeparam=ref
||shareasale-analytics.com^$removeparam=afftrack
||shareasale-analytics.com^$removeparam=lplid
||shareasale-analytics.com^$removeparam=shrsl_analytics_sscid
||shareasale-analytics.com^$removeparam=shrsl_analytics_sstid
! https://github.com/AdguardTeam/AdguardFilters/issues/155149
||sportsbull.jp^$removeparam=vkTop
! https://github.com/AdguardTeam/AdguardFilters/issues/155063
||hbol.jp^$removeparam=cx_clicks_art_mdl
! https://github.com/AdguardTeam/AdguardFilters/issues/155096
||singtao.ca^$removeparam=referid
! https://github.com/AdguardTeam/AdguardFilters/issues/155071
||orbis.co.jp^$removeparam=adid
! https://github.com/AdguardTeam/AdguardFilters/issues/154947
||mora.jp^$removeparam=fmid
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6306117
||record.pt^$removeparam=ref
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6306026
||wsj.com^$removeparam=reflink
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6252773
||github.com^$removeparam=reference_location
! https://github.com/AdguardTeam/AdguardFilters/issues/154325
||column.sp.baseball.findfriends.jp^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/153955
||fon.bet^$removeparam=affijet-click
||fon.bet^$removeparam=partner_id
||fon.bet^$removeparam=sub_1
! https://github.com/AdguardTeam/AdguardFilters/issues/154223
||you.163.com^$removeparam=from
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6213496
||jetbrains.com^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/154057
||middleware.p7s1.io/galileo/v1/tracking?device=*&country=*&path=$removeparam=/^(device|country|path)=/,xmlhttprequest
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6185764
||theathletic.com^$removeparam=login_source
||theathletic.com^$removeparam=ref_page
! https://github.com/AdguardTeam/AdguardFilters/issues/153546
||productcatalog.channeladvisor.com^$document,removeparam=InteractionSessionId
||productcatalog.channeladvisor.com^$document,removeparam=UniqueUserId
||productcatalog.channeladvisor.com^$document,removeparam=DeviceTypeId
||productcatalog.channeladvisor.com^$document,removeparam=PCAT_vNextTracking_LocalWidget
||productcatalog.channeladvisor.com^$document,removeparam=PCAT_vNextTracking_OnlinePlrss
||productcatalog.channeladvisor.com^$document,removeparam=PCAT_vNextTracking_OnlineItrack
||productcatalog.channeladvisor.com^$document,removeparam=PCAT_vNextTracking_RetailerScoring
||productcatalog.channeladvisor.com^$document,removeparam=profileId
||go.skimresources.com^$document,removeparam=id
||go.skimresources.com^$document,removeparam=xcust
||chemistwarehouse.com.au^$removeparam=ranMID
||chemistwarehouse.com.au^$removeparam=ranEAID
||chemistwarehouse.com.au^$removeparam=ranSiteID
! https://github.com/AdguardTeam/AdguardFilters/issues/153536
||playstation.com$removeparam=emcid
! epicgames.com
||epicgames.com^$removeparam=epic_gameId
||epicgames.com^$removeparam=epic_affiliate
! https://github.com/AdguardTeam/AdguardFilters/issues/153222
||gamersgate.com^$removeparam=caff
||humblebundle.com^$removeparam=partner
! https://github.com/AdguardTeam/AdguardFilters/issues/153288
||minfin.com.ua^$removeparam=mpr
||minfin.com.ua^$removeparam=mpl
||minfin.com.ua^$removeparam=mcr
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6133356
||cnbc.com^$removeparam=__source
||cnbc.com^$removeparam=par
! Naver newsstand - https://newsstand.naver.com/
$removeparam=plink,domain=sbs.co.kr
$removeparam=cooper,domain=sbs.co.kr
$removeparam=nv,domain=khan.co.kr
$removeparam=naver,domain=dt.co.kr
$removeparam=pg,domain=fnnews.com
$removeparam=sc,domain=dailian.co.kr
$removeparam=OutLink,domain=sedaily.com
$removeparam=newsstand,domain=sportalkorea.com
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6129946
||theathletic.com^$removeparam=source
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6097514
||deepl.com^$removeparam=cta
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6077178
||espn.com^$removeparam=appsrc
! https://github.com/uBlockOrigin/uBlock-issues/discussions/2683
||sciencedirect.com/*?via%3D$removeparam=/^via%3D/
! https://github.com/AdguardTeam/AdguardFilters/issues/152614
||similarweb.com^$removeparam=from_ext
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-6040753
||bild.de^$removeparam=t_ref
! https://github.com/AdguardTeam/AdguardFilters/issues/152218
||simplelogin.io^$removeparam=slref
! https://github.com/AdguardTeam/AdguardFilters/issues/152313
||applesfera.com^$cookie=NID
! https://github.com/AdguardTeam/AdguardFilters/issues/151756
||pravda.com.ua^$removeparam=pageviewCount
! https://github.com/AdguardTeam/AdguardFilters/pull/152161
||belta.co.jp^$removeparam=cid
$removeparam=urrad,domain=u-s-s.jp|belta.co.jp
! https://github.com/AdguardTeam/AdguardFilters/issues/151413
||7net.omni7.jp^$removeparam=intpr
||7net.omni7.jp^$removeparam=intpr2
! https://dietpartner.jp/?from=common from popup on the page
||dietpartner.jp^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/151234
||mailtrack.io/trace/link/$removeparam=userId
! https://github.com/AdguardTeam/AdguardFilters/issues/150811
||trendyol.com^$removeparam=adjust_t
! https://github.com/AdguardTeam/AdguardFilters/issues/151197
||kitizawa.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/151002
||smart-flash.jp^$removeparam=rf
! https://github.com/AdguardTeam/AdguardFilters/issues/151193
||chunichi.co.jp^$removeparam=rct
||chunichi.co.jp^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/150965
$removeparam=ref_type,domain=backit.me|epn.bz
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-5898232
||homedepot.com^$removeparam=fromReminder
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-5886900
||boards.greenhouse.io^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/150733
||headlines.peta.org^$removeparam=en_txn7
! https://github.com/AdguardTeam/AdguardFilters/issues/150639
||tokyo-calendar.jp^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/149911
||mofos.com$removeparam=ats
! https://github.com/AdguardTeam/AdguardFilters/issues/150086
||quizangel.com^$removeparam=utm_site_source
||quizangel.com^$removeparam=utm_site_medium
||quizangel.com^$removeparam=utm_site_campaign
! https://github.com/AdguardTeam/AdguardFilters/issues/150409
||media.joj.sk/outstream/embed$removeparam=ad_params
||media.joj.sk/outstream/embed$removeparam=gemius_identifier
||media.joj.sk/outstream/embed$removeparam=tracking_params
||media.joj.sk/outstream/embed$removeparam=ga_account
! https://github.com/AdguardTeam/AdguardFilters/issues/149710
||klook.com^$removeparam=aid
||klook.com^$removeparam=clickId
||klook.com^$removeparam=spm
! Skimlinks
! https://developers.skimlinks.com/link.html
||go.redirectingat.com^$removeparam=xcust
||go.redirectingat.com^$removeparam=sref
||go.redirectingat.com^$removeparam=id
! https://github.com/AdguardTeam/AdguardFilters/issues/148859
||kmkk78.com^$removeparam=agentId
! https://github.com/AdguardTeam/AdguardFilters/issues/148414
$removeparam=ref,domain=shein.co.uk|shein.com
$removeparam=from_country,domain=shein.co.uk|shein.com
$removeparam=mallCode,domain=shein.co.uk|shein.com
$removeparam=src_module,domain=shein.co.uk|shein.com
$removeparam=src_tab_page_id,domain=shein.co.uk|shein.com
$removeparam=phone_code,domain=shein.co.uk|shein.com
$removeparam=ici,domain=shein.co.uk|shein.com
! https://github.com/AdguardTeam/AdguardFilters/issues/148579
||nesine.com^$removeparam=adj_adgroup
||nesine.com^$removeparam=adj_creative
||nesine.com^$removeparam=adjust_t
||nesine.com^$removeparam=glid
||nesine.com^$removeparam=rlid
||nesine.com^$removeparam=trid
||nesine.com^$removeparam=xid_param_2
! https://github.com/AdguardTeam/AdguardFilters/issues/148128
||nordot.app^$removeparam=ncmp
! https://github.com/AdguardTeam/AdguardFilters/issues/147848
||news-postseven.com^$removeparam=_from
! https://github.com/AdguardTeam/AdguardFilters/issues/147602
||redtube.com^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/147654
||tokyo-np.co.jp^$removeparam=rct
! https://github.com/AdguardTeam/AdguardFilters/issues/147500
||yahoo.com^$removeparam=ncid
! https://github.com/AdguardTeam/AdguardFilters/issues/147649
||nishispo.nishinippon.co.jp^$removeparam=rct
! https://github.com/AdguardTeam/AdguardFilters/issues/147553
||zapiska.substack.com^$removeparam=isFreemail
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-5498306
||sincode.ai^$removeparam=via
! https://mintj.com/msm/?adv=_3271__nelubcd57h9l2o0i2mejjp4os
||mintj.com^$removeparam=adv
! https://github.com/AdguardTeam/AdguardFilters/pull/147247
||kakaku.com^$removeparam=lid
! https://github.com/AdguardTeam/AdguardFilters/issues/146439
||stacksocial.com^$removeparam=rid
||stacksocial.com^$removeparam=aid
! https://github.com/AdguardTeam/AdguardFilters/issues/146805
||vodopad.ru^$removeparam=sphrase_id
! https://github.com/AdguardTeam/AdguardFilters/issues/146773
/landing.$removeparam=ref
/landing.$removeparam=clickid
/landing.$removeparam=pixelid
! https://github.com/AdguardTeam/AdguardFilters/issues/146387
||forbes.com^$removeparam=sh
! https://github.com/AdguardTeam/AdguardFilters/issues/146618
||gorodche.ru^$removeparam=utm
! https://github.com/AdguardTeam/AdguardFilters/issues/144434
||bloomberg.com^$removeparam=in_source
||bloomberg.com^$removeparam=leadSource
||bloomberg.com^$removeparam=sref
||bloomberg.com^$removeparam=srnd
! https://github.com/AdguardTeam/AdguardFilters/issues/146268
||marketwatch.com^$removeparam=mod
! https://github.com/AdguardTeam/AdguardFilters/issues/145690
||podbean.com/player/$xmlhttprequest,removeparam=referrer
||podbean.com/pb/$media,removeparam=pbss
! https://d.odsyms15.com/click?aid=TRXQogYpQwUfabkFYwBd1N&mimp=BKQqfygO3fT5NfH4YOZDAw&session=86516a42-961b-4085-aa1b-f164b60f019a&uid.p=&ext.referrer=www.google.com&article_id=12787190441
||d.odsyms15.com/click$removeparam=article_id
||d.odsyms15.com/click$removeparam=ext.referrer
||d.odsyms15.com/click$removeparam=uid.p
! https://github.com/AdguardTeam/AdguardFilters/issues/145354
||olx.$removeparam=ad_reason_recommended_items
! https://github.com/AdguardTeam/AdguardFilters/issues/145581
||faphouse.com^$removeparam=statsUID
||faphouse.com^$removeparam=xhUserId
||faphouse.com^$removeparam=UserId
||faphouse.com^$removeparam=login
||faphouse.com^$removeparam=signature
||faphouse.com^$removeparam=valid
||faphouse.com^$removeparam=veb
||faphouse.com^$removeparam=vep
! https://github.com/AdguardTeam/AdguardFilters/issues/145457
||xhamster.com^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/145079
||lite.qwant.com/redirect/$removeparam=cachekey
||lite.qwant.com/redirect/$removeparam=serp_position
||lite.qwant.com/redirect/$removeparam=position
||lite.qwant.com/redirect/$removeparam=t
||lite.qwant.com/redirect/$removeparam=tgp
||lite.qwant.com/redirect/$removeparam=locale
||lite.qwant.com/redirect/$removeparam=query
||lite.qwant.com/redirect/$removeparam=ad
||lite.qwant.com/redirect/$removeparam=uri
! https://realestate.yahoo.co.jp/new/mansion/dtl/00145093/?sc_out=mikle_mansion_sumulog_side_dtl
||realestate.yahoo.co.jp^$removeparam=sc_out
! https://github.com/AdguardTeam/AdguardFilters/issues/143623
||glami.cz^$removeparam=/ga[ct]id/
! https://github.com/AdguardTeam/AdguardFilters/issues/143625
||open.spotify.com^$removeparam=referral
||open.spotify.com^$removeparam=si
! SK Telecom (skt.sh domain used as their own URL shortening service )
||skt.sh/common/share/bridge?$removeparam=referer
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-4966523
||login.sooplive.co.kr^$removeparam=szFrom
! moffme.com?source=gl&medium=moffme&campaign=article_2699
||moffme.com^$removeparam=source
||moffme.com^$removeparam=medium
||moffme.com^$removeparam=campaign
! Uzou recommendation trackparam
||click.speee-ad.jp^$removeparam=os
||click.speee-ad.jp^$removeparam=ref
||click.speee-ad.jp^$removeparam=sess_id
||click.speee-ad.jp^$removeparam=slot_index
||click.speee-ad.jp^$removeparam=v
!! tiktok
! https://github.com/AdguardTeam/AdguardFilters/issues/192966
||tiktok.com$removeparam=referer_video_id
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-4978150
||tiktok.com^$removeparam=embed_source
||tiktok.com^$removeparam=referer_url
||tiktok.com^$removeparam=refer
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-1909327
||tiktok.com^$removeparam=sec_uid
||tiktok.com^$removeparam=web_id
||tiktok.com^$removeparam=share_app_id
||tiktok.com^$removeparam=share_author_id
||tiktok.com^$removeparam=tt_from
! https://github.com/AdguardTeam/AdguardFilters/issues/181809
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-750307
||tiktok.com^$removeparam=_d
||tiktok.com^$removeparam=share_link_id
||tiktok.com^$removeparam=u_code
||tiktok.com^$removeparam=_r
! email/copy link function
||tiktok.com/@*/video/*$removeparam=is_from_webapp
||tiktok.com/@*/video/*$removeparam=sender_device
! Create effects link on main page and then clicking on a link
||tiktok.com$removeparam=enter_method
! login button on effect page - breaks comments after logging in
! ||tiktok.com$removeparam=enter_from
! searching a phrase and clicking on it
||tiktok.com/search$removeparam=t
||tiktok.com/@*/video/*$removeparam=q
! ads.tiktok.com signup page
||ads.tiktok.com/*/signup$removeparam=_source_
||ads.tiktok.com/*/signup$removeparam=cacheSDK
||ads.tiktok.com/*/signup$removeparam=region
! tiktok end
! https://voicy.jp/channel/2964/451627?share.ref=https%3A%2F%2Ft.co%2F
||voicy.jp^$removeparam=share.ref
! https://github.com/AdguardTeam/AdguardFilters/issues/141768
||chaturbate.com^$removeparam=/tour|campaign/,~third-party
! https://github.com/AdguardTeam/AdguardFilters/issues/140672
||awaliwa.com^$removeparam=lg
||awaliwa.com^$removeparam=s
||awaliwa.com^$removeparam=c
||awaliwa.com^$removeparam=z
||awaliwa.com^$removeparam=old
||awaliwa.com^$removeparam=bd_vid
||awaliwa.com^$removeparam=acr
! https://github.com/AdguardTeam/AdguardFilters/issues/140847
||megaknihy.cz^$removeparam=/param[0-9]{1}|utm_si|matchtype|device|creative|keyword|placement|adposition|campaignid|adgroupid|feeditemid|targetid|loc_|searchtype|network|search_pos|cat_pos|block|position/
! https://github.com/AdguardTeam/AdguardFilters/issues/140642
||brazzers.com^$removeparam=ats
! https://github.com/AdguardTeam/AdguardFilters/pull/140612
||whale.naver.com^$removeparam=wpid
! https://github.com/AdguardTeam/AdguardFilters/issues/140300
||wemakeprice.com^$removeparam=refer
! https://joshi-spa.jp/1213445?cx_clicks_art_mdl=2_title
||joshi-spa.jp^$removeparam=cx_clicks_art_mdl
||joshi-spa.jp^$removeparam=cx_clicks_sldbox
! https://github.com/AdguardTeam/AdguardFilters/issues/139766
||n11.com^$removeparam=/pfx|adj/
! https://home.kingsoft.jp/news/transport/dressup/175273.html?from=content
||home.kingsoft.jp^$removeparam=from
! AT Internet
||bbc.$removeparam=facebook_page
||bbc.$removeparam=at_bbc_team
! https://github.com/AdguardTeam/AdguardFilters/issues/138614
||jlcpcb.com^$removeparam=from
! https://event.hoken-mammoth.jp/sp/lps/event_promotion12/?s_mf=0901mamana
||event.hoken-mammoth.jp^$removeparam=s_mf
! internal links ex. https://www.cinematoday.jp/page/A0008622?g_clk=top_specials
||cinematoday.jp^$removeparam=g_clk
! affiliate links on h7-game.com (nsfw)
$removeparam=afid,domain=123chat.jp|kanochat.jp|live.fc2.com
! https://github.com/AdguardTeam/AdguardFilters/issues/136734
||investing.com^$cookie=smd
||investing.com^$cookie=udid
! https://github.com/AdguardTeam/AdguardFilters/pull/137576
||basketballking.jp^$removeparam=cx_art
! https://github.com/AdguardTeam/AdguardFilters/issues/136987
||japan.cnet.com^$removeparam=tag
! https://github.com/AdguardTeam/AdguardFilters/issues/136988
||asahi.com^$removeparam=iref
||asahi.com^$removeparam=ref
||asahi.com^$removeparam=cid
! https://github.com/AdguardTeam/AdguardFilters/issues/136989
||cnn.co.jp^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/137545
||jiji.com^$removeparam=m
! https://github.com/AdguardTeam/AdguardFilters/issues/136991
||fashion-press.net^$removeparam=media
! https://github.com/AdguardTeam/AdguardFilters/issues/136853
||douban.com^$removeparam=_i
! https://oshiete.goo.ne.jp/ksos/?from=hensyu_i
||oshiete.goo.ne.jp^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/135493
||immobilienscout24.de^$removeparam=referrer
||immobilienscout24.de^$removeparam=navigationServiceUrl
||immobilienscout24.de^$removeparam=searchId
||immobilienscout24.de^$removeparam=searchGeoPath
||immobilienscout24.de^$removeparam=source
!+ NOT_PLATFORM(ext_ublock)
||immobilienscout24.de^$removeparam=enteredFrom
! https://github.com/AdguardTeam/AdguardFilters/issues/134658
||tumblr.com^$removeparam=source
! https://github.com/AdguardTeam/AdguardFilters/issues/134656
||tumblr.app.link^$removeparam=_p
! https://github.com/AdguardTeam/AdguardFilters/issues/135099
||dhits.docomo.ne.jp^$removeparam=affiliate
! https://github.com/AdguardTeam/AdguardFilters/issues/134731
||promo.korabli.su^$removeparam
! Adjust
||app.adjust.com^$removeparam=nend_click_id
||app.adjust.com^$removeparam=install_callback
||app.adjust.com^$removeparam=ip_address
||app.adjust.com^$removeparam=user_agent
||app.adjust.com^$removeparam=campaign
||app.adjust.com^$removeparam=creative
||app.adjust.com^$removeparam=/^event_callback_/
! https://github.com/AdguardTeam/AdguardFilters/issues/134215
||elgato.com^$removeparam=platform
||elgato.com^$removeparam=link_id
||elgato.com^$removeparam=token
||elgato.com^$removeparam=contact_id
||elgato.com^$removeparam=attribution_window
! Emails from vercel.com
! https://github.com/AdguardTeam/AdguardFilters/issues/133525
||vercel.com^$removeparam=redirected
||vercel.com^$removeparam=sfmc_channel
||vercel.com^$removeparam=sfmc_activity_name
||vercel.com^$removeparam=sfmc_activity_id
||vercel.com^$removeparam=sfmc_journey_name
||vercel.com^$removeparam=sfmc_journey_id
||vercel.com^$removeparam=sfmc_asset_id
||vercel.com^$removeparam=sfmc_activityid
! https://github.com/AdguardTeam/AdguardFilters/issues/133961
! https://github.com/AdguardTeam/AdguardFilters/issues/190214
||getir.com^$removeparam=is_retargeting
||getir.com^$removeparam=shortlink
||getir.com^$removeparam=deep_link_value
||getir.com^$removeparam=c
||getir.com^$removeparam=source_caller
||getir.com^$removeparam=pid
||getir.com^$removeparam=af_reengagement_window
! https://github.com/AdguardTeam/AdguardFilters/issues/134281
||imdb.com^$removeparam=pf_rd_m
||imdb.com^$removeparam=pf_rd_p
||imdb.com^$removeparam=pf_rd_r
||imdb.com^$removeparam=pf_rd_s
||imdb.com^$removeparam=pf_rd_t
||imdb.com^$removeparam=pf_rd_i
! https://github.com/uBlockOrigin/uAssets/issues/12972#issuecomment-1286665177
||mirror.co.uk^$removeparam=int_source
! https://github.com/AdguardTeam/AdguardFilters/issues/132478
||wiley.com^$removeparam=/elq/
! https://github.com/AdguardTeam/AdguardFilters/issues/131490
||thumbs4.redgifs.com/*&for=$removeparam=for
||thumbs4.redgifs.com/*&for=$image,removeparam=for
! politica.com.ua - links click counter
||politica.com.ua^$removeparam=isUser
! https://github.com/AdguardTeam/AdguardFilters/issues/184902
! https://github.com/AdguardTeam/AdguardFilters/issues/164592
! https://github.com/AdguardTeam/AdguardFilters/issues/144898
! https://github.com/AdguardTeam/AdguardFilters/issues/131139
$removeparam=sp_atk,domain=shopee.ph|shopee.co.th|shopee.co.id
$removeparam=xptdk,domain=shopee.ph|shopee.co.th|shopee.co.id
$removeparam=publish_id,domain=shopee.ph|shopee.co.th|shopee.co.id
$removeparam=promotionId,domain=shopee.ph|shopee.co.th|shopee.co.id
$removeparam=stm_medium,domain=shopee.ph|shopee.co.th|shopee.co.id
$removeparam=stm_source,domain=shopee.ph|shopee.co.th|shopee.co.id
! https://github.com/AdguardTeam/AdguardFilters/issues/131093
||adguard.$removeparam=clid
$removeparam=clid,domain=adguard-vpn.*|adguardvpn-help.*
! Cognativex
||campaigns-serving.cognativex.com^$xmlhttprequest,removeparam=history_postids
||campaigns-serving.cognativex.com^$xmlhttprequest,removeparam=device_code
||campaigns-serving.cognativex.com^$xmlhttprequest,removeparam=exc_ads
||campaigns-serving.cognativex.com^$xmlhttprequest,removeparam=history_adids
! https://github.com/AdguardTeam/AdguardFilters/issues/129287
||dzen.ru/api/*/launcher/stats/$image,xmlhttprequest,removeparam
||dzen.ru^$removeparam=from
||dzen.ru^$removeparam=cl4url
||dzen.ru^$removeparam=tst
||dzen.ru^$document,removeparam=clid
||dzen.ru^$removeparam=yredirect
||dzen.ru^$removeparam=stid
||dzen.ru^$removeparam=persistent_id
! https://github.com/AdguardTeam/AdguardFilters/issues/130186
||teknosa.com^$removeparam=aid
||teknosa.com^$removeparam=campid
||teknosa.com^$removeparam=cid
||teknosa.com^$removeparam=crid
||teknosa.com^$removeparam=plid
||teknosa.com^$removeparam=sid
||teknosa.com^$removeparam=source
! https://github.com/AdguardTeam/AdguardFilters/issues/129807
||bunte.de^$removeparam=umt_source
! https://github.com/AdguardTeam/AdguardFilters/issues/129679
||store.udiscovermusic.com^$removeparam=/utm_/
! https://github.com/uBlockOrigin/uAssets/issues/14653
||hktvmall.com/yuicombo?$script,removeparam=/_ui\/shared\/common\/js\/analytics\/with-intersection-track.js/
! https://github.com/AdguardTeam/AdguardFilters/issues/128820
||go.xlivrdr.com^$removeparam
||stripchat.com^$removeparam=affiliateId
||stripchat.com^$removeparam=referrer
! https://github.com/AdguardTeam/AdguardFilters/issues/128917
||1password.university^$removeparam=utm_ref
! https://github.com/AdguardTeam/AdguardFilters/issues/128779
||blog.twitch.tv^$removeparam=web_only
! https://github.com/AdguardTeam/AdguardFilters/issues/128377
||michaelkors.global^$removeparam=ecid
! https://github.com/AdguardTeam/AdguardFilters/issues/128548
||doctolib.de^$removeparam=utm_website
||doctolib.de^$removeparam=utm_page-url
||doctolib.de^$removeparam=utm_content-group
||doctolib.de^$removeparam=utm_button
! https://github.com/AdguardTeam/AdguardFilters/issues/128206
||nationalgeographic.com^$removeparam=utm_rd
! https://github.com/AdguardTeam/AdguardFilters/issues/128339
||ficbook.net^$removeparam=/premiumVisit|utm_compaign/
! stripchat.com
||stripchat.com^$removeparam=campaignId
||stripchat.com^$removeparam=sourceId
||stripchat.com^$removeparam=realDomain
! https://github.com/AdguardTeam/AdguardFilters/issues/128061
||fmworld.net^$removeparam=from
! https://github.com/AdguardTeam/AdguardFilters/issues/127953
||kaspersky.$removeparam=icid
! Facebook
||facebook.com/marketplace/$removeparam=tracking
||facebook.com^$removeparam=extid
||facebook.com^$removeparam=mibextid
! https://github.com/AdguardTeam/AdGuardSDNSFilter/issues/1024
||zenaps.com^$removeparam=cookie
||zenaps.com^$removeparam=bId
||awin1.com^$removeparam=linkid
||awin1.com^$removeparam=clickref
||awin1.com^$removeparam=awinaffid
! https://github.com/AdguardTeam/AdguardFilters/issues/126807
||music.apple.com^$removeparam=itsct
||music.apple.com^$removeparam=itscg
! https://github.com/AdguardTeam/AdguardFilters/issues/126395
||netflix.com^$removeparam=trackId
||netflix.com^$removeparam=tctx
! georiot.com
||target.georiot.com/Proxy.ashx$removeparam=tsid
! https://github.com/AdguardTeam/AdguardFilters/issues/126227
||kamigame.jp^$removeparam=kamigame_source
! https://github.com/AdguardTeam/AdguardFilters/issues/125102
||shop.hololivepro.com^$removeparam=pr_rec_id
||shop.hololivepro.com^$removeparam=pr_rec_pid
||shop.hololivepro.com^$removeparam=pr_ref_pid
||shop.hololivepro.com^$removeparam=pr_seq
||shop.hololivepro.com^$removeparam=pr_prod_strat
! https://github.com/AdguardTeam/AdguardFilters/issues/125352
||wq.jd.com^$removeparam=pvid
! https://github.com/AdguardTeam/AdguardFilters/issues/124323
||coolblue.nl^$removeparam=clickref
||coolblue.nl^$removeparam=ref
||coolblue.nl^$removeparam=PHGref
||coolblue.nl^$removeparam=cmt
! https://github.com/AdguardTeam/AdguardFilters/issues/124313
||banggood.com^$removeparam=utmid
! dell.com
||dell.com^$removeparam=gacd
! https://github.com/AdguardTeam/AdguardFilters/issues/123415
||revolut.com^$removeparam=%7Ecampaign_id
||revolut.com^$removeparam=%7Eclick_id
||revolut.com^$removeparam=ext
||revolut.com^$removeparam=%7Esecondary_publisher
||revolut.com^$removeparam=%243p
! https://github.com/AdguardTeam/AdguardFilters/issues/123908
||wise.com^$removeparam=partnerizecampaignID
||wise.com^$removeparam=adref
||wise.com^$removeparam=clickref
||wise.com^$removeparam=partnerID
! https://github.com/AdguardTeam/AdguardFilters/issues/123824
||join.worldoftanks.$removeparam=xid
||join.worldoftanks.$removeparam=sid
||join.worldoftanks.$removeparam=enctid
||join.worldoftanks.$removeparam=pub_id
! https://github.com/AdguardTeam/AdguardFilters/issues/123835
||weather.com$removeparam=par
! https://github.com/AdguardTeam/AdguardFilters/issues/123493
||mirtesen.ru^$removeparam=nvuuid
||mirtesen.ru^$removeparam=bvuuid
||mirtesen.ru^$removeparam=ad
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-2381922
$removeparam=oref,domain=defenseone.com|govexec.com|nextgov.com|route-fifty.com
! https://github.com/AdguardTeam/AdguardFilters/issues/123160
||whistleout.com.au^$cookie=ARRAffinity
||whistleout.com.au^$cookie=ARRAffinitySameSite
! https://github.com/AdguardTeam/AdguardFilters/issues/123340
||rac.co.uk^$removeparam=cid
! https://github.com/AdguardTeam/AdguardFilters/pull/122979
||heraldcorp.com/view.php$removeparam=pos
! toomics.com
||toomics.com^$removeparam=pid
||toomics.com^$removeparam=subpid
||toomics.com^$removeparam=channel
||toomics.com^$removeparam=gen
! get-express-vpns.com
||get-express-vpns.com^$removeparam=sxid
||get-express-vpns.com^$removeparam=ttorigin
! https://github.com/AdguardTeam/AdguardFilters/issues/123349
||zavvi.com^$removeparam=affil
||zavvi.com^$removeparam=sv_campaign_id
! MacKeeper
||mkaff.com/landings/$removeparam
! Lazada
$removeparam=mkttid,domain=lazada.com.ph|lazada.vn
$removeparam=laz_trackid,domain=lazada.com.ph|lazada.vn
$removeparam=trafficFrom,domain=lazada.com.ph|lazada.vn
$removeparam=spm,domain=lazada.com.ph|lazada.vn
$removeparam=scm,domain=lazada.com.ph|lazada.vn
$removeparam=acm,domain=lazada.com.ph|lazada.vn
$removeparam=clickTrackInfo,domain=lazada.com.ph|lazada.vn
! trib.al - redirecting service used by spiegel.de (when posting on facebook.com)
||trib.al$removeparam=fbclid
||trib.al$removeparam=h
||trib.al$removeparam=__tn__
||trib.al$removeparam=c[0]
! Mail.Ru
||trk.mail.ru^$subdocument,removeparam=mt_click_id
$removeparam=/utm_partner_id|frommail/,domain=mail.ru|sportmail.ru
||pulse.mail.ru^$removeparam=/^(udid|DeviceID|ver|appbuild|vendor|model|device_name|device_type|instanceid|device_year|connection_class|appsflyerid)/
! https://github.com/AdguardTeam/AdguardFilters/issues/120891
! Removing "primer", "subset_id" parameters causes that some fonts are displaying incorrectly - https://github.com/AdguardTeam/AdguardFilters/issues/126288
! another one https://github.com/AdguardTeam/AdguardFilters/issues/126333, https://github.com/AdguardTeam/AdguardFilters/issues/134475
||use.typekit.net^$font,removeparam=~/^(primer|subset_id)=/,domain=~fonts.adobe.com
||p.typekit.net^$stylesheet,removeparam
! https://github.com/AdguardTeam/AdguardFilters/issues/120276 ex. https://snail.qcplay.co.jp/?shortlink=tadqwmj0&c=GamerchPCJack0523-0606&pid=Gamerch
||qcplay.co.jp/?shortlink=*&c=$removeparam=c
||qcplay.co.jp^$removeparam=pid
||qcplay.co.jp^$removeparam=shortlink
! https://github.com/AdguardTeam/AdguardFilters/issues/119110
||giphy.com^$removeparam=cid
||giphy.com^$removeparam=ct
||giphy.com^$removeparam=rid
! https://github.com/AdguardTeam/AdguardFilters/issues/123265
! https://github.com/AdguardTeam/AdguardFilters/issues/119833
! https://github.com/AdguardTeam/AdguardFilters/issues/120322
$removeparam=ref,domain=jin115.com|bipblog.com|animember.net|sbbit.jp|blog.livedoor.jp|blog.jp|2chblog.jp
! https://www.cinematoday.jp/site/tokyo-vice/?g_clk=topcover
||cinematoday.jp^$removeparam=g_clk
! https://xxvidsx.com/?vid=87&ad=0&site=
||xxvidsx.com^$removeparam=ad
||xxvidsx.com^$removeparam=site
! https://github.com/AdguardTeam/AdguardFilters/issues/115977
||rapidgator.net^$removeparam=Referer
! https://developer.atlassian.com/developer-guide/client-identification/
||atlassian.net^$removeparam=atlOrigin
! https://www.so-net.ne.jp/access/hikari/minico/ad/?SmRcid=snt_snt_top_gate
||so-net.ne.jp^$removeparam=SmRcid
! https://github.com/AdguardTeam/AdguardFilters/issues/150742
! https://github.com/AdguardTeam/AdguardFilters/issues/113231#issuecomment-1091899519
||ameblo.jp^$removeparam=adxarea
||ameblo.jp^$removeparam=frm_id
! popin.cc widgets
||popin.cc/popin_discovery/$script,removeparam=info
||popin.cc/popin_discovery/$script,removeparam=uid
! cancanlah.com
||cancanlah.com^$removeparam=click_id
! https://github.com/AdguardTeam/AdguardFilters/issues/114505
||api.cxense.com/public/widget/data?json=$script,removeparam=sid
||api.cxense.com/public/widget/data?json=$script,removeparam=experienceId
||api.cxense.com/public/widget/data?json=$script,removeparam=trackingId
||api.cxense.com/public/widget/data?json=$script,removeparam=prnd
||api.cxense.com/public/widget/data?json=$script,removeparam=getId
||api.cxense.com/public/widget/data?json=$script,removeparam=usi
||api.cxense.com/public/widget/data?json=$script,removeparam=widgetId
! https://github.com/AdguardTeam/AdguardFilters/issues/114561
||lp.sophos.com^$removeparam=elqTrackId
! https://github.com/AdguardTeam/AdguardFilters/issues/114206
||player.theplatform.com^$removeparam=playeranalytics
||player.theplatform.com^$removeparam=targetedlink
! https://github.com/AdguardTeam/AdguardFilters/issues/113639
||zalando.$removeparam=wmc
||zalando.$removeparam=/^cd\d+/
||zalando.$removeparam=wt_cd
||zalando.$removeparam=tm_hem
! https://github.com/AdguardTeam/AdguardFilters/issues/113567
||iguru.gr^$removeparam=_unique_id
||iguru.gr^$removeparam=feed_id
! https://github.com/AdguardTeam/AdguardFilters/issues/112404
||quora.com/qemail/tc?$removeparam=al_imp
||quora.com/qemail/tc?$removeparam=uid
! https://github.com/AdguardTeam/AdguardFilters/issues/113386
||humblebundle.com^$removeparam=hmb_medium
||humblebundle.com^$removeparam=hmb_campaign
||humblebundle.com^$removeparam=hmb_source
||humblebundle.com^$removeparam=mcID
||humblebundle.com^$removeparam=linkID
! https://github.com/AdguardTeam/AdguardFilters/issues/113137
||netkeiba.com^$removeparam=rf
! Firefox extensions intall/update tracking
||services.addons.mozilla.org^$removeparam=telemetry-client-id
||versioncheck.addons.mozilla.org^$xmlhttprequest,removeparam=appID
! Firefox download installer tracking
! https://www.comss.ru/page.php?id=10300
||download.mozilla.org^$removeparam=attribution_sig
||download.mozilla.org^$removeparam=attribution_code
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-2381922
||nextgov.com^$removeparam=oref
||defenseone.com^$removeparam=oref
! https://github.com/AdguardTeam/AdguardFilters/issues/112692
||wizcase.com/?$removeparam=pageview_id
||wizcase.com/?$removeparam=clickout_id
||wizcase.com/?$removeparam=vid
||microsoft.msafflnk.net^$removeparam=sharedid
||microsoft.msafflnk.net^$removeparam=/^subid/
||ojrq.net/p/$removeparam=tpsync
||ojrq.net/p/$removeparam=cid
||click.linksynergy.com/fs-bin/click?id=$removeparam=u1
||click.linksynergy.com/fs-bin/click?id=$removeparam=u2
! https://forum.adguard.com/index.php?threads/47148/
||go.mysku.ru^$removeparam=~r
! apple.com
||apple.com^$removeparam=afid
||apple.com^$removeparam=cid
||apple.com^$removeparam=ct
||apple.com^$removeparam=pt
! https://github.com/AdguardTeam/AdguardFilters/issues/112345
$removeparam=ActionID,domain=otto.de|ottoversand.at
$removeparam=AffiliateID,domain=otto.de|ottoversand.at
$removeparam=campid,domain=otto.de|ottoversand.at
! https://github.com/AdguardTeam/AdguardFilters/pull/112096
||search.naver.com/p/crd/rd$removeparam=i
||search.naver.com/p/crd/rd$removeparam=px,document,image
||search.naver.com/p/crd/rd$removeparam=py,document,image
||search.naver.com/p/crd/rd$removeparam=sx,document,image
||search.naver.com/p/crd/rd$removeparam=sy,document,image
||search.naver.com/p/crd/rd$removeparam=p,document,image
||search.naver.com/p/crd/rd$removeparam=s,document,image
||search.naver.com/p/crd/rd$removeparam=time,document,image
! https://github.com/AdguardTeam/AdguardFilters/issues/110942
||buzzfeednews.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/110758
||goodreads.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/110462
||coconala.com^$removeparam=ref
||coconala.com^$removeparam=ref_kind
||coconala.com^$removeparam=ref_no
! https://github.com/AdguardTeam/AdguardFilters/issues/109153
$domain=atlanticcouncil.org|digikey.com,removeparam=/^mkt_tok/
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-2155728
||xkcd.com^$removeparam=trk
! https://github.com/AdguardTeam/AdguardFilters/issues/109834
||video.laxd.com^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/108915#issuecomment-1031525591
! https://github.com/AdguardTeam/AdguardFilters/issues/109244
||approach.yahoo.co.jp^$removeparam=code
! Taobao, Tmall
||taobao.com^$removeparam=scm
||taobao.com^$removeparam=pvid
||taobao.com^$removeparam=utparam
||tmall.com^$removeparam=ali_trackid
||tmall.com^$removeparam=bxsign
$removeparam=union_lens,domain=tmall.com|taobao.com
||taobao.com^$removeparam=traceId
||taobao.com^$removeparam=activityId
||taobao.com^$removeparam=xId
||taobao.com^$removeparam=ptl
||taobao.com^$removeparam=app_pvid
! Aliexpress
||aliexpress.$removeparam=algo_pvid
||aliexpress.$removeparam=curPageLogUid
||aliexpress.$removeparam=pdp_npi
||aliexpress.$removeparam=aff_trace_key
||aliexpress.$removeparam=aff_platform
||aliexpress.$removeparam=aff_short_key
||aliexpress.$removeparam=spm
||aliexpress.$removeparam=scm
||aliexpress.$removeparam=scm_id
||aliexpress.$removeparam=scm-url
||aliexpress.$removeparam=utparam
||aliexpress.$removeparam=aff_fcid
||aliexpress.$removeparam=terminal_id
||aliexpress.$removeparam=aff_trace_key
||aliexpress.$removeparam=aff_fsk
||aliexpress.$removeparam=pvid
||aliexpress.$removeparam=dp
||aliexpress.$removeparam=sk
! https://github.com/AdguardTeam/AdguardFilters/issues/108478
||agoda.com^$removeparam=tag
! https://github.com/AdguardTeam/AdguardFilters/issues/106186
||editor.flixier.com^$removeparam=/fx_(source|medium|campaign)/
! https://github.com/AdguardTeam/AdguardFilters/issues/108860
||github.com/signup$removeparam=source
||github.com/signup$removeparam=/^ref_/
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-2052109
||tradingview.com^$removeparam=source
! https://github.com/AdguardTeam/AdguardFilters/issues/107988
||api.cxense.com^$removeparam=/^cx_/
||api.cxense.com^$removeparam=/^pickup_list_click/
! Rakuten sites self-promo links
$removeparam=l-id,domain=nikki.ne.jp|rakuten.co.jp|rebates.jp
$removeparam=scid,domain=rakuten.co.jp|rakuten-wallet.co.jp
||rakuten.co.jp^$removeparam=sc2id
! https://github.com/AdguardTeam/AdguardFilters/issues/107266
||azby.fmworld.net/cgi-bin/common/rd.cgi?$removeparam=affitest
! https://github.com/AdguardTeam/AdguardFilters/issues/107199
||azby.fmworld.net^$removeparam=mc_pc
! https://toku.yahoo.co.jp/ytop202111/entry?fr=weather_right_column
||toku.yahoo.co.jp^$removeparam=fr
! https://github.com/AdguardTeam/AdguardFilters/issues/106436
! https://github.com/AdguardTeam/AdguardFilters/issues/106435
! https://github.com/AdguardTeam/AdguardFilters/issues/106434
! https://github.com/AdguardTeam/AdguardFilters/issues/106432
||nikkei.com^$removeparam=i_cid
||nikkei.com^$removeparam=n_cid
||nikkeibp.co.jp^$removeparam=i_cid
! https://github.com/AdguardTeam/AdguardFilters/issues/104716
||cyberlink.com^$removeparam=affid
! https://github.com/AdguardTeam/AdguardFilters/issues/106316
||zestradar.com^$removeparam=adclid
! https://github.com/AdguardTeam/AdguardFilters/issues/104773
||hit.gemius.pl/hitredir$removeparam=id
||hit.gemius.pl/hitredir$removeparam=extra
! adorama.com
||adorama.com^$removeparam=obem
||adorama.com^$removeparam=bc_pid
! https://github.com/AdguardTeam/AdguardFilters/commit/920d973db052ded91b48fbb8c7ca3fe2fdeda237
||adjust.com^$removeparam=adgroup
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-1899731
||reddit.app.link^$removeparam=adblock
||reddit.app.link^$removeparam=compact_view
||reddit.app.link^$removeparam=dnt
||reddit.app.link^$removeparam=geoip_country
||reddit.app.link^$removeparam=referrer_domain
||reddit.app.link^$removeparam=referrer_url
! https://github.com/AdguardTeam/AdguardFilters/issues/105183
||dmkt-sp.jp^$removeparam=impressionId
! www.dmm.co.jp trackparam
||dmm.co.jp^$removeparam=dmmref
||dmm.co.jp^$removeparam=i3_ord
||dmm.co.jp^$removeparam=i3_ref
! https://github.com/AdguardTeam/AdguardFilters/issues/105143
||imdb.com^$removeparam=ref_
! https://github.com/AdguardTeam/AdguardFilters/issues/104987
||livedoor.biz^$removeparam=ref
! adjust.com tracking
||adj.st^$removeparam=CollectionId
||adj.st^$removeparam=adjust_deeplink
||adj.st^$removeparam=pt
||adj.st^$removeparam=pd
||adj.st^$removeparam=adj_campaign
||adj.st^$removeparam=adj_adgroup
||adj.st^$removeparam=adj_creative
||adj.st^$removeparam=adj_adnomia_click_id
||adj.st^$removeparam=pfx
||adj.st^$removeparam=adj_deeplink
||adj.st^$removeparam=adj_install_callback
||adj.st^$removeparam=adj_event_callback_dn2j7g_5mdnim
! Alexa extension tracking
||data.alexa.com/data/$xmlhttprequest,removeparam=/cdt|ref/
! https://github.com/AdguardTeam/AdguardFilters/pull/118824
||comodo.com^$removeparam=key5sk1
! https://forum.adguard.com/index.php?threads/46096/
||comodo.com^$removeparam=track
||comodo.com^$removeparam=af
! https://github.com/AdguardTeam/AdguardFilters/pull/104464
||link.coupang.com^$removeparam=lptag
! https://github.com/AdguardTeam/AdguardFilters/issues/101790
||wuzhuiso.com^$removeparam=src
! https://github.com/AdguardTeam/AdguardFilters/pull/103989
||nordvpn.com^$removeparam=data1
! https://github.com/AdguardTeam/AdguardFilters/issues/100580
||upgrad.com^$removeparam=UTM_MEDIUM
! https://github.com/uBlockOrigin/uAssets/issues/10867
||adweek.com^$removeparam=traffic_source
! AdGuard
$removeparam=aid,domain=adguard-vpn.*|adguard-dns.io|adguard.com|adguard.info|adgardvpn-help.*
! https://github.com/AdguardTeam/AdguardFilters/pull/102144
||kitbag.com^$removeparam=_ref
||kitbag.com^$removeparam=ab
! vstat extension tracking
||web.vstat.info^$removeparam=guid
||web.vstat.info^$removeparam=user_agent
! https://github.com/AdguardTeam/AdguardFilters/issues/101590
||start.pm.by^$removeparam=adtag
! https://github.com/AdguardTeam/AdguardFilters/issues/100613
||redhotpawn.com^$removeparam=cbqsid
! https://github.com/AdguardTeam/AdguardFilters/issues/99645
||trendyol.com^$removeparam=tyutm_source
||trendyol.com^$removeparam=tyutm_medium
||trendyol.com^$removeparam=tyutm_campaign
! https://github.com/AdguardTeam/AdguardFilters/pull/100181
||cc.loginfra.com/cc$removeparam=a
||cc.loginfra.com/cc$removeparam=bw
||cc.loginfra.com/cc$removeparam=px
||cc.loginfra.com/cc$removeparam=py
||cc.loginfra.com/cc$removeparam=sx
||cc.loginfra.com/cc$removeparam=sy
||cc.loginfra.com/cc$removeparam=nsc
! https://github.com/AdguardTeam/AdguardFilters/issues/99345
||mein.onlinekonto.de^$removeparam=ref
! https://github.com/Yuki2718/adblock/issues/39
||dengekionline.com^$removeparam=osusume_banner
! https://github.com/AdguardTeam/AdguardFilters/pull/99938
! for more info - https://www.biaodianfu.com/spm.html
$removeparam=spm,domain=aliyun.com|sohu.com
||aliyun.com^$removeparam=scm
$removeparam=dt_dapp,domain=douban.com|163.com
||douban.com^$removeparam=dt_platform
! Google Play source tracking
||play.google.com^$removeparam=pcampaignid
! http://www.cyber-ad01.cc/0155/?ip=0155&id=L206
||cyber-ad01.cc^$removeparam=ip
! https://d-markets.net/markets/p/r?_loc=101928001&_article=1503722&_link=1449535&_lurl=http%3A%2F%2Fwww.cityheaven.net%2Faichi%2FA2302%2FA230201%2Ffujiko-ogaki_i%2Fnews%2FnewsId-1449535/?ref=myheaven
||d-markets.net^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/pull/111386
! Coupang.com - An electronic commerce service of S. Korea.
||coupang.com/*/products/$removeparam=isshortened
||coupang.com/*/products/$removeparam=src
||coupang.com/*/products/$removeparam=spec
||coupang.com/*/products/$removeparam=addtag
||coupang.com/*/products/$removeparam=ctag
||coupang.com/*/products/$removeparam=lptag
||coupang.com/*/products/$removeparam=itime
||coupang.com/*/products/$removeparam=pageType
||coupang.com/*/products/$removeparam=pageValue
||coupang.com/*/products/$removeparam=redirect
||coupang.com/*/products/$removeparam=mcid
||coupang.com/*/products/$removeparam=sharesource
||coupang.com/*/products/$removeparam=style
||coupang.com/*/products/$removeparam=settlement
||coupang.com/*/products/$removeparam=adType
||coupang.com/*/products/$removeparam=sourceType
||coupang.com/*/products/$removeparam=wTrackId
||coupang.com/*/products/$removeparam=filterKey
||coupang.com/*/products/$removeparam=TrackId
||coupang.com/*/products/$removeparam=wEntrySource
||coupang.com/*/products/$removeparam=uriScheme
||coupang.com/*/products/$removeparam=q
||coupang.com^$removeparam=searchId
||coupang.com^$removeparam=wRef
||coupang.com^$removeparam=traceid
||coupang.com^$removeparam=wTime
||coupang.com^$removeparam=wPcid
! https://github.com/AdguardTeam/AdguardFilters/issues/97108#issuecomment-942178734
||weidian.com^$removeparam=/distributorid|wfr|ifr|share_relation/
! https://github.com/AdguardTeam/AdguardFilters/issues/97935
||jasonsavard.com^$removeparam=/cUrl|ref/
! https://github.com/AdguardTeam/AdguardFilters/issues/196606
! https://www.expressvpn.com/tfk?a_aid=tf, https://vpnarea.com/front/member/signup?a_aid=torrentgalaxy
$removeparam=a_aid,domain=expressvpn.com|vpnarea.com|wook.pt|affiliate.privatevpn.com
! https://github.com/AdguardTeam/AdguardFilters/issues/97742
||hog.*^$removeparam=ad
! https://github.com/AdguardTeam/AdguardFilters/pull/95024
! lcs.naver.com - It is used on Naver Corp's platform
||lcs.naver.com/m?u=$removeparam=os
||lcs.naver.com/m?u=$removeparam=ln
||lcs.naver.com/m?u=$removeparam=sr
||lcs.naver.com/m?u=$removeparam=bw
||lcs.naver.com/m?u=$removeparam=bh
||lcs.naver.com/m?u=$removeparam=ls
||lcs.naver.com/m?u=$removeparam=navigationStart
||lcs.naver.com/m?u=$removeparam=requestStart
||lcs.naver.com/m?u=$removeparam=responseStart
||lcs.naver.com/m?u=$removeparam=responseEnd
||lcs.naver.com/m?u=$removeparam=domLoading
||lcs.naver.com/m?u=$removeparam=domInteractive
||lcs.naver.com/m?u=$removeparam=domContentLoadedEventStart
||lcs.naver.com/m?u=$removeparam=domContentLoadedEventEnd
||lcs.naver.com/m?u=$removeparam=domComplete
||lcs.naver.com/m?u=$removeparam=loadEventStart
||lcs.naver.com/m?u=$removeparam=loadEventEnd
||lcs.naver.com/m?u=$removeparam=pid
||lcs.naver.com/m?u=$removeparam=ts
! https://github.com/AdguardTeam/AdguardFilters/issues/95525
||edx.org^$removeparam=source
! https://github.com/AdguardTeam/AdguardFilters/issues/95523
||infoq.com^$removeparam=/topicPageSponsorship|^itm_/
! https://github.com/AdguardTeam/AdguardFilters/issues/94722
||adshares.net^$removeparam=cid
! https://github.com/AdguardTeam/AdguardFilters/issues/130919
||creativecloud.adobe.com^$removeparam=trackingid
! https://github.com/AdguardTeam/AdguardFilters/issues/94664
||get.adobe.com^$removeparam=browser_type
||get.adobe.com^$removeparam=browser_dist
! https://github.com/AdguardTeam/AdguardFilters/issues/94669
||get.adobe.com^$removeparam=type
||get.adobe.com^$removeparam=workflow
||get.adobe.com^$removeparam=promoid
||get.adobe.com^$removeparam=TRILIBIS_EMULATOR_UA
! https://github.com/AdguardTeam/AdguardFilters/issues/95058
||ups.xplosion.de/ctx?event_id=$removeparam
! https://github.com/AdguardTeam/AdguardFilters/issues/93452
||app.5-delivery.ru^$removeparam=c
||app.5-delivery.ru^$removeparam=pid
! https://github.com/AdguardTeam/AdguardFilters/issues/94414
||voyeur-house.tv^$removeparam=clickid
! https://github.com/AdguardTeam/AdguardFilters/issues/94768
||cht.com.tw^$removeparam=Source
||cht.com.tw^$removeparam=Identifier
! aufast.co - affiliate(ads) links tracking
||aufast.co^$removeparam=/^utm_/
||aufast.co^$removeparam=clickid
! iqbroker.com - affiliate(ads) links tracking
||iqbroker.com^$removeparam=afftrack
||iqbroker.com^$removeparam=clickid
||iqbroker.com^$removeparam=aff_model
! https://github.com/AdguardTeam/AdguardFilters/issues/93072
! https://github.com/AdguardTeam/AdguardFilters/issues/92383
! ads_params - it contains information on a which website video iframe is embedded
||dailymotion.com/embed/video/*?ads_params=*&origin=$removeparam=ads_params
||dailymotion.com/embed/video/*?ads_params=*&origin=$removeparam=origin
! https://github.com/AdguardTeam/AdguardFilters/issues/143017
||wired.co.uk^$removeparam=mbid
||wired.com^$removeparam=mbid
! https://github.com/AdguardTeam/AdguardFilters/issues/91233
||wikihow.com^$removeparam=?utm_source
! kohls.com - counter
||kohls.com^$removeparam=CID
! instagram.com - share tracking
||instagram.com^$removeparam=ig_rid
||instagram.com^$removeparam=igsh
$removeparam=igshid,domain=instagram.com|threads.net
! https://github.com/AdguardTeam/AdguardFilters/issues/89768
||mediamarkt.com.tr^$removeparam=rbtc
! https://github.com/AdguardTeam/AdguardFilters/issues/90055
||t.myvisualiq.net^$removeparam=~red
! https://github.com/AdguardTeam/AdguardFilters/issues/89556
||uspoloassn.com^$removeparam=ref
||arcelik.com.tr^$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/88784
||express.de^$removeparam=cb
||ksta.de^$removeparam=cb
!
! LinkedIn
! Survey and self-promos
||linkedin.com^$removeparam=courseClaim
||linkedin.com^$removeparam=lipi
||linkedin.com^$removeparam=trk
! Premium upsell survey tracking
||linkedin.com/premium/$removeparam=isSS
||linkedin.com/premium/$removeparam=referenceId
||linkedin.com/premium/$removeparam=upsellOrderOrigin
||linkedin.com/premium/$removeparam=destRedirectURL
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-3262558
||linkedin.com^$removeparam=original_referer
||linkedin.com^$removeparam=refId
||linkedin.com^$removeparam=trackingId
! https://github.com/AdguardTeam/AdguardFilters/issues/88502
||linkedin.com/authwall?$removeparam=trkInfo
||linkedin.com/authwall?$removeparam=originalReferer
! https://github.com/AdguardTeam/AdguardFilters/issues/110477
||linkedin.com^$removeparam=/^trk/
!
! https://github.com/AdguardTeam/AdguardFilters/issues/69722
||digikey.com^$removeparam=/^utm_cid/
!
! NicoNico (nicovideo.jp)
! Keep subdomain
$removeparam=from,domain=anime.nicovideo.jp|dic.nicovideo.jp
||nicovideo.jp^$removeparam=transition_id
||nicovideo.jp^$removeparam=transition_type
||nicovideo.jp^$removeparam=rf
||nicovideo.jp^$removeparam=rp
||nicovideo.jp^$removeparam=ra
||nicovideo.jp^$removeparam=rd
||nicovideo.jp^$removeparam=transit_from
||live.nicovideo.jp^$removeparam=ch_anime_ref
||seiga.nicovideo.jp^$removeparam=track
||manga.nicovideo.jp^$removeparam=track
||sp.nicovideo.jp^$removeparam=ss_id
||sp.nicovideo.jp^$removeparam=ss_pos
||sp.nicovideo.jp^$removeparam=cp_in
||sp.nicovideo.jp^$removeparam=cnt_transit
||sp.nicovideo.jp^$removeparam=viewing_source
||nicovideo.jp^$removeparam=news_ref
||nicovideo.jp^$removeparam=cmnhd_ref
||nicovideo.jp^$removeparam=ref
||nicoft.io^$removeparam=cmnhd_ref
||nicoebook.jp^$removeparam=track
! Naver (naver.com) - tracking parameter
! https://github.com/AdguardTeam/AdguardFilters/pull/89838
||search.naver.com/search.naver$removeparam=tqi
||cc.naver.com/cc?a$removeparam=bw
||cc.naver.com/cc?a$removeparam=px
||cc.naver.com/cc?a$removeparam=py
||cc.naver.com/cc?a$removeparam=sx
||cc.naver.com/cc?a$removeparam=sy
! Yandex
$removeparam=search_source,domain=ya.ru|yandex.*
$removeparam=search_domain,domain=ya.ru|yandex.*
||yandex.*/search/$removeparam=banerid
||yandex.*/search/$removeparam=suggest_reqid
||yandex.*/search/$removeparam=did
||yandex.*/promo/$removeparam=utm-term
||yandex.*/news/$removeparam=from
||yandex.*/news/$removeparam=persistent_id
||yandex.*/sport/$removeparam=persistent_id
||yandex.*/news/$removeparam=msid
||yandex.*/sport/$removeparam=msid
||yandex.*/news/$removeparam=mlid
||yandex.*/sport/$removeparam=mlid
||yandex.*/news/$removeparam=stid
||yandex.*/sport/$removeparam=stid
||yandex.*/images/$removeparam=source-serpid
! Yandex.Market
||market.yandex.$removeparam=offerid
||market.yandex.$removeparam=show-uid
||market.yandex.$removeparam=uniqueId
||market.yandex.$removeparam=vid
||market.yandex.$removeparam=mclid
||market.yandex.$removeparam=clid
!+ NOT_PLATFORM(android)
||market.yandex.$removeparam=uniqueId
! https://github.com/AdguardTeam/AdguardFilters/issues/88606
||www.yandex.$removeparam=clid
://yandex.$removeparam=clid
://yandex.$removeparam=source
! Yandex.Docs
||docs.yandex.$removeparam=uid
! Yandex.Disk
! Do not remove \`sk\` parameter - https://github.com/AdguardTeam/AdguardFilters/issues/178459
! Yandex.Pixel
||amc.yandex.ru^$removeparam=cmn_id
||amc.yandex.ru^$removeparam=ad_type=banner
||amc.yandex.ru^$removeparam=crv_id
!
! Baidu search - statictics
||www.baidu.com^$removeparam=rsv_pq
||www.baidu.com^$removeparam=rsv_t
! https://github.com/AdguardTeam/CoreLibs/issues/1464
! Probably a bug
!#if (!adguard_app_windows && !adguard_app_mac && !adguard_app_android)
||www.baidu.com/link?url=$removeparam=eqid
!#endif
! bitrec.com recommendations widget
||cod.bitrec.com/topocentras-services/js/recs?$removeparam=visitorId
||cod.bitrec.com/topocentras-services/js/recs?$removeparam=externalVisitorId
||cod.bitrec.com/topocentras-services/js/recs?$removeparam=r
! https://github.com/AdguardTeam/AdguardFilters/issues/89345
||play.google.*^$removeparam=referrer
! Google Search
! ||www.google.com/url?$removeparam=ved
! Breaks codepage in Google Search https://yugioh-wiki.net/index.php
! ||google.*/search$removeparam=ie
||google.*/search$removeparam=gs_l
||google.*/search$removeparam=gs_lp
||google.*/search$removeparam=sca_esv
||google.*/search$removeparam=sclient
||google.*/search$removeparam=ved
||google.*/search$removeparam=oq
||google.*/search$removeparam=gs_l
||google.*/search$removeparam=oe
||google.*/websearch$removeparam=visit_id
||google.*/search$removeparam=biw
||google.*/search$removeparam=bih
||google.*/search$removeparam=sa
||google.*/search$removeparam=source
||google.*/search$removeparam=aqs
||google.*/search$removeparam=sourceid
||google.*/search$removeparam=ei
||google.*/search$removeparam=gs_lcp
||google.*/search$removeparam=gs_lcrp
||google.*/search$removeparam=uds
||google.*/search$removeparam=fbs
||google.*/search$removeparam=iflsig
||google.*/search$removeparam=sstk
||google.*/webhp$removeparam=sca_esv
||google.*/webhp$removeparam=ved
||google.*/maps$removeparam=sca_esv
||google.*/maps$removeparam=source
||google.*/maps$removeparam=g_ep
! https://github.com/AdguardTeam/AdguardFilters/issues/191127
||google.$removeparam=subid
!
! eBay tracking parameters
||www.ebay.$removeparam=epid
||www.ebay.$removeparam=itmmeta
||www.ebay.$removeparam=hash
||www.ebay.$removeparam=itmprp
||www.ebay.$removeparam=ssspo
||www.ebay.$removeparam=sssrc
||www.ebay.$removeparam=ssuid
||www.ebay.$removeparam=mkevt
||www.ebay.$removeparam=mkcid
||www.ebay.$removeparam=_trkparms
||www.ebay.$removeparam=amdata
||www.ebay.$removeparam=mkrid
||www.ebay.$removeparam=campid
! https://github.com/uBlockOrigin/uAssets/issues/25247
! ||www.ebay.$removeparam=_trksid
!
! Amazon tracking IDs found on several subpages
! Disabled rules:
! https://github.com/AdguardTeam/AdguardFilters/issues/157889#issuecomment-1660195416
! ||amazon.*$removeparam=psc
! https://github.com/AdguardTeam/AdguardFilters/issues/110571
! ||amazon.*$removeparam=ref
! https://github.com/AdguardTeam/AdguardFilters/issues/88627
! ||amazon.*$removeparam=ref_
! ||amazon.*$removeparam=ie
! https://github.com/AdguardTeam/AdguardFilters/issues/89163
! ||amazon.*/message-us$removeparam=origRef
! https://github.com/AdguardTeam/AdguardFilters/issues/148958
! Breaks navigation and removes chosen seller id on the item's page
! ||amazon.*$removeparam=smid
! Broken redirect to Amazon from stores
! ||amazon.*$removeparam=ascsubtag
!
! ||amazon.*$removeparam=sr - breaks automatic jump to review details
! ||amazon.*$removeparam=s - breaks URLs which includes it to sort
! https://github.com/DandelionSprout/adfilt/discussions/163#discussioncomment-5867802
$removeparam=asc_campaign,domain=aboutamazon.com|amazon.*|amzn.to
$removeparam=asc_refurl,domain=aboutamazon.com|amazon.*|amzn.to
$removeparam=asc_source,domain=aboutamazon.com|amazon.*|amzn.to
!
||amazon.*$removeparam=isDramIntegrated
||amazon.*$removeparam=shoppingPortalEnabled
||amazon.*/*dp/$removeparam=dib
||amazon.*/*dp/$removeparam=dib_tag
||amazon.*/*dp/$removeparam=keywords
||amazon.*$removeparam=tag
||amazon.*$removeparam=adgrpid
||amazon.*$removeparam=AssociateTag
||amazon.*/gp/buyagain$removeparam=ats
||amazon.*$removeparam=c
||amazon.*$removeparam=camp
||amazon.*$removeparam=creative
||amazon.*$removeparam=creativeASIN
||amazon.*$removeparam=dchild
||amazon.*$removeparam=field-lbr_brands_browse-bin
||amazon.*$removeparam=hvadid
||amazon.*$removeparam=hvbmt
||amazon.*$removeparam=hvdev
||amazon.*$removeparam=hvlocphy
||amazon.*$removeparam=hvnetw
||amazon.*$removeparam=hvqmt
||amazon.*$removeparam=hvrand
||amazon.*$removeparam=hvtargid
||amazon.*$removeparam=hydadcr
||amazon.*$removeparam=initialIssue
||amazon.*$removeparam=linkCode
||amazon.*$removeparam=linkId
||amazon.*$removeparam=pd_rd_i
||amazon.*$removeparam=pd_rd_r
||amazon.*$removeparam=pd_rd_w
||amazon.*$removeparam=pd_rd_wg
||amazon.*$removeparam=pf_rd_i
||amazon.*$removeparam=pf_rd_m
||amazon.*$removeparam=pf_rd_p
||amazon.*$removeparam=pf_rd_r
||amazon.*$removeparam=pf_rd_s
||amazon.*$removeparam=pf_rd_t
||amazon.*$removeparam=pf_rd_w
||amazon.*$removeparam=plattr
||amazon.*$removeparam=qid
||amazon.*$removeparam=rdc
||amazon.*$removeparam=refRID
||amazon.*$removeparam=th
||amazon.*$removeparam=ts_id
||amazon.*$removeparam=visitId
||amazon.*$removeparam=vtr
||amazon.*/aa$removeparam=bitCampaignCode
||amazon.*/artists/$removeparam=tag
||amazon.*/dp/$removeparam=tag
||amazon.*/gp/$removeparam=tag
||amazon.*/hz/contact-us/csp$removeparam=/entries/
||amazon.*/hz/contact-us/csp$removeparam=/Version/
||amazon.*/hz/contact-us/csp$removeparam=from
||amazon.*/hz/contact-us/csp$removeparam=source
||amazon.*/message-us$removeparam=muClientName
! ||amazon.*$removeparam=content-id
! https://github.com/AdguardTeam/AdguardFilters/issues/83138
||app.mi.com/download/*?id=$removeparam=ref
||app.mi.com/download/*?id=$removeparam=nonce
||app.mi.com/download/*?id=$removeparam=appClientId
||app.mi.com/download/*?id=$removeparam=appSignature
! https://github.com/AdguardTeam/AdguardFilters/issues/83136
||mp.weixin.qq.com^$removeparam=chksm
||mp.weixin.qq.com^$removeparam=key
||mp.weixin.qq.com^$removeparam=uin
||mp.weixin.qq.com^$removeparam=devicetype
||mp.weixin.qq.com^$removeparam=exportkey
||mp.weixin.qq.com^$removeparam=mpshare
||mp.weixin.qq.com^$removeparam=scene
||mp.weixin.qq.com^$removeparam=srcid
||mp.weixin.qq.com^$removeparam=nettype
||mp.weixin.qq.com^$removeparam=WBAPIAnalysisOriUICodes
||mp.weixin.qq.com^$removeparam=v_p
||mp.weixin.qq.com^$removeparam=launchid
||mp.weixin.qq.com^$removeparam=from
||mp.weixin.qq.com^$removeparam=aid
! Prevent tracking when request is unblocked
||pixel.adsafeprotected.com/services/pub?$xmlhttprequest,removeparam=slot
||pixel.adsafeprotected.com/services/pub?$xmlhttprequest,removeparam=sessionId
||pixel.adsafeprotected.com/services/pub?$xmlhttprequest,removeparam=anId
||pixel.adsafeprotected.com/services/pub?$xmlhttprequest,removeparam=wr
||pixel.adsafeprotected.com/services/pub?$xmlhttprequest,removeparam=sr
||pixel.adsafeprotected.com/services/pub?$xmlhttprequest,removeparam=url
! Ads tracking
||cam4.com^$removeparam=act
||cam4.com^$removeparam=suid
||cam4.com^$removeparam=showSignupPopup
! Tracks source site
$removeparam=ocid,document,domain=msn.com
$removeparam=ocid,domain=bbc.com|bbc.co.uk
$removeparam=ns_mchannel,domain=bbc.com|bbc.co.uk
$removeparam=ns_source,domain=bbc.com|bbc.co.uk
$removeparam=ns_campaign,domain=bbc.com|bbc.co.uk
$removeparam=ns_linkname,domain=bbc.com|bbc.co.uk
$removeparam=ns_fee,domain=bbc.com|bbc.co.uk
! insider.office.com
||office.com^$removeparam=ocid
! Embedded tweets
$removeparam=refsrc,domain=twitter.com|x.com
$removeparam=ref_src,domain=twitter.com|x.com
$removeparam=ref_url,domain=twitter.com|x.com
! Twitter
$removeparam=cxt,domain=twitter.com|x.com
$removeparam=s,domain=twitter.com|x.com
! Breaks redirects https://github.com/uBlockOrigin/uAssets/issues/20941
! Do not apply to urls with /i/redirect?url=
.com/*/status/$removeparam=t,domain=twitter.com|x.com
!
||zerkalo.io^$removeparam=tg
||zerkalo.io^$removeparam=vk
!
! https://github.com/AdguardTeam/AdguardFilters/issues/88163
||nbcume.sc.omtrdc.net/id?d_visid_ver=$removeparam=/mcorgid|mid|ts/,domain=nbcdfw.com
!
||trendyol.com^$removeparam=utm_subaff
!
||realitykings.com^$removeparam=ats
||marktjagd.de^$removeparam=client
||coursera.org^$removeparam=siteID
||mag2.com^$removeparam=trflg
||dailymail.co.uk^$removeparam=ito
||mioga.de^$removeparam=pl
||mioga.de^$removeparam=idealoid
||ejoker.de^$removeparam=sPartner
||ejoker.de^$removeparam=idealoid
||gmx.*/logoutlounge$removeparam=p
||web.de/logoutlounge$removeparam=p
||gmx.*^$removeparam=mc
||web.de^$removeparam=mc
||lotto.gmx.*^$removeparam=partnerId
||lotto.gmx.*^$removeparam=advertisementId
||lotto.web.de^$removeparam=partnerId
||lotto.web.de^$removeparam=advertisementId
||shopping.gmx.*^$removeparam=origin
||shopping.web.de^$removeparam=origin
||ad.doubleclick.net/ddm/trackclk/$removeparam=/^dc_trk_/
||alza.de/*.htm$removeparam=kampan
||cosse.de^$removeparam=referer
||idealo.de/*.html$removeparam=offerKey
||idealo.de/*.html$removeparam=offerListId
||marketing.net.idealo-partner.com^$removeparam=smc2
||marketing.net.idealo-partner.com^$removeparam=smc5
||media01.eu/set.aspx$removeparam=trackid
||netgames.de^$removeparam=refID
||www.alternate.de^$removeparam=partner
||www.galaxus.de^$removeparam=pcscpId
||marketing.net.idealo-partner.com^$removeparam=amc
||www.lidl.de^$removeparam=msktc
||www.pricezilla.de^$removeparam=bid
!
||boomstore.de/*.html$removeparam=campaign
||www.alternate.de^$removeparam=campaign
||www.alternate.de^$removeparam=campaign
!
||cosse.de^$removeparam=sPartner
||www.technikdirekt.de^$removeparam=sPartner
||www.hitseller.de^$removeparam=sPartner
!
||galaxus.de^$removeparam=idealoid
||www.technikdirekt.de^$removeparam=idealoid
||netgames.de^$removeparam=idealoid
||www.alternate.de^$removeparam=idealoid
||www.electronic4you.de^$removeparam=idealoid
||www.hitseller.de^$removeparam=idealoid
!
||www.hitseller.de^$removeparam=etcc_cmp
||marketing.net.idealo-partner.com^$removeparam=etcc_cmp
!
||www.hitseller.de^$removeparam=etcc_med
||marketing.net.idealo-partner.com^$removeparam=etcc_med
!
||www.hitseller.de^$removeparam=etcc_produkt
||marketing.net.idealo-partner.com^$removeparam=etcc_produkt
!
||visit.digidip.net^$removeparam=/^(ppref|ref|pid)=/
||ad.admitad.com^$removeparam=/^subid/
||mvideo.ru^$removeparam=/^(_requestid|reff)=/
!
||websearch.rakuten.co.jp/Web?$removeparam=ref
||rakuten.co.jp^*&trflg=$removeparam=trflg
||search.yahoo.co.jp^$removeparam=fr
! https://github.com/AdguardTeam/AdguardFilters/issues/116479
||flipkart.com^$removeparam=_refId
||flipkart.com^$removeparam=/^affExtParam/
||flipkart.com^$removeparam=affid
||flipkart.com^$removeparam=cid
||flipkart.com^$removeparam=iid
||flipkart.com^$removeparam=lid
||flipkart.com^$removeparam=/^otracker/
||flipkart.com^$removeparam=pageUID
||flipkart.com^$removeparam=pwsvid
||flipkart.com^$removeparam=ssid
||flipkart.com^$removeparam=store
! Daraz & Shop (Samesite)
||daraz.*$removeparam=/spm=|scm=|from=|keyori=|sugg=|search=|mp=|c=|^abtest|^abbucket|pos=|themeID=|algArgs=|clickTrackInfo=|acm=|item_id=|version=|up_id=|pvid=/
! Bilibili
||bilibili.com^$removeparam=from_spmid
||bilibili.com^$removeparam=msource
||bilibili.com^$removeparam=csource
||bilibili.com^$removeparam=source
||bilibili.com^$removeparam=share_from
||bilibili.com^$removeparam=spmid
||bilibili.com^$removeparam=plat_id
||bilibili.com^$removeparam=buvid
||bilibili.com^$removeparam=up_id
||bilibili.com^$removeparam=seid
||bilibili.com^$removeparam=share_source
||bilibili.com^$removeparam=spm_id_from
||bilibili.com^$removeparam=from_spm_id
||bilibili.com^$removeparam=share_medium
||bilibili.com^$removeparam=share_plat
||bilibili.com^$removeparam=share_session_id
||bilibili.com^$removeparam=share_tag
||bilibili.com^$removeparam=timestamp
||bilibili.com^$removeparam=unique_k
||search.bilibili.com^$removeparam=from_source
||bilibili.com^$removeparam=vd_source
! https://github.com/AdguardTeam/AdguardFilters/issues/188783#issuecomment-2359649738
! ||bilibili.com^$removeparam=mid
! Weibo
||weibo.*^$removeparam=weibo_id
||weibo.*^$removeparam=dt_dapp
! Iqiyi
||iqiyi.com^$removeparam=vfrm
||iqiyi.com^$removeparam=vfrmblk
||iqiyi.com^$removeparam=vfrmrst
! Sohu
||sohu.com^$removeparam=_f
||sohu.com^$removeparam=_trans_
||sohu.com^$removeparam=scm
||sohu.com^$removeparam=spm
! Youku
||v.youku.com^$removeparam=ptag
||v.youku.com^$removeparam=scm
||v.youku.com^$removeparam=spm
! The Register
||theregister.com^$removeparam=td
!
! Deezer
! https://github.com/AdguardTeam/AdguardFilters/pull/119475
||deezer.com^$removeparam=origin
||deezer.com^$removeparam=deferredFl
! GamesPlanet
||gamesplanet.com^$removeparam=ref
!
! Special rules for AdGuard websites' test pages. The only purpose of these
! rules is to make test pages work so that users could verify that AdGuard
! is properly working.
!
!+ NOT_OPTIMIZED
adguard.info,adguard.com,adguard.app##.hello_from_adguard_tracking_params
! Detect of using AdGuard products
!+ PLATFORM(windows, mac, android, ios) NOT_OPTIMIZED
adguard.info,adguard.com,adguard.app##.hello_from_adguard_apps
!+ NOT_PLATFORM(windows, mac, android, ios, ext_ublock) NOT_OPTIMIZED
adguard.info,adguard.com,adguard.app##.hello_from_adguard_ext
! Detect HTTPS filtering
!+ PLATFORM(windows, mac, android) NOT_OPTIMIZED
||https-filtering-check.adtidy.org^
! Detect Advanced Protection of AdGuard for iOS
!+ PLATFORM(ios) NOT_OPTIMIZED
adguard.info,adguard.com,adguard.app#$#.hello_from_adguard_advanced_protection_ios { display: none !important; }
!
`;

/**
 * Default filter lists
 */
export const DEFAULT_FILTER_LISTS: FilterList[] = [
  {
    name: 'ubo-privacy',
    raw: UBO_PRIVACY_FILTERS
  },
  {
    name: 'adguard-general',
    raw: ADGUARD_GENERAL_TRACK_PARAMS
  },
  {
    name: 'adguard-specific',
    raw: ADGUARD_SPECIFIC_TRACK_PARAMS
  }
];

/**
 * Create a filter list from the built-in default filters
 */
export function createDefaultFilterList(): FilterList {
  return {
    name: 'default-tracking-filters',
    raw: [UBO_PRIVACY_FILTERS, ADGUARD_GENERAL_TRACK_PARAMS, ADGUARD_SPECIFIC_TRACK_PARAMS].join('\n\n')
  };
}
