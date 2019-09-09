// ========= fixedRightBtn ==============================================================================================================================
Vue.component('fixedRightBtn', {
    template: ` <div class="stickArea">
                    <a href="https://etrade.franklin.com.tw/Open/Entrance?_ga=2.208322578.1469198285.1558324636-1105955615.1553681100" target="_blank" class="event-open">立即開戶&#8250;</a>
                    <a href="https://etrade.franklin.com.tw/Home/Login?_ga=2.208322578.1469198285.1558324636-1105955615.1553681100" target="_blank" class="event-order">立即下單&#8250;</a>
                    <a href="tel:0800885888" target="_blank" class="event-call">理財專線&#8250;</a>
                    <a href="https://m.me/franklin.taiwan/"  target="_blank"  class="event-robo">智能客服&#8250;</a>
                    <a href="https://www.franklin.com.tw/Seminar/Registration/2c6af963-2084-45ad-a32d-0bc0deffefde?Category=FundKnowledge"  target="_blank"  class="event-lecture">講座報名&#8250;</a>
                </div>`,
});

// ========= 頁面切換按鍵 ==============================================================================================================================
Vue.component('switchBtn', {
    props: ['tit', 'activeNo', 'homeLink'],
    data: function(){
        return {
            active1: false,
            active2: false,
            active3: false,
        }
    },
    template: ` <div class="survey-switchBtnArea">
                    <div class="survey-switchBtnArea-tit wow fadeIn">
                        {{ tit }}
                    </div>
                    <div class="survey-switchBtnArea-btnArea">
                        <div class="survey-btn wow fadeInUp" :class="{active : active1}" data-wow-delay="0.3s">
                            <a href="survey-1.html#top" title="準備退休金">
                                準備退休金
                            </a>
                        </div>
                        <div class="survey-btn wow fadeInUp" :class="{active : active2}" data-wow-delay="0.6s">
                            <a href="survey-2.html#top" title="退休金投資">
                                退休金投資
                            </a>
                        </div>
                        <div class="survey-btn wow fadeInUp" :class="{active : active3}" data-wow-delay="0.9s">
                            <a href="survey-3.html#top" title="退休後生活">
                                退休後生活
                            </a>
                        </div>
                    </div>
                    <div class="survey-switchBtnArea-homeLink" v-if="homeLink">
                        <a href="survey.html#top">
                            回到主頁 <i class="fas fa-chevron-right"></i>
                        </a>
                    </div>
                </div>`,
    mounted() {
        this.addActive();
    },
    methods: {
        addActive() {
            let n = this.activeNo;
            if ( n == 1) {
                this.active1 = true
            }
            if (n == 2) {
                this.active2 = true
            }
            if (n == 3) {
                this.active3 = true
            }
        },
    },
});

// ========= banner ==============================================================================================================================
Vue.component('bannerArea', {
    props: ['switchBtnNo'],
    template: ` <div class="survey-banner">
                    <div class="container">
                        <div class="content">
                            <div class="survey-banner-right wow fadeIn">
                                <img src="survey/images/banner-titBg.png" alt="" class="survey-banner-titBg">
                                <img src="survey/images/banner-tit.png" alt="" class="survey-banner-tit">
                                <div class="survey-banner-text">
                                    已於全球各地進行8個年頭的《富蘭克林坦伯頓基金集團退休收入策略暨預期調查》Retirement Income Strategies and Expectations，今年首次針對台灣民眾進行退休市調，快來看看台灣人的退休安排與實際現況。
                                </div>
                                <img src="survey/images/banner-magnifier.png" alt="" class="survey-banner-magnifier">
                            </div>
                            <img src="survey/images/banner-man.png" alt="" class="survey-banner-man wow fadeInUp">

                            <div id="top"></div>
                            <switch-btn tit="馬上看調查結果" :active-no="switchBtnNo" home-link=""></switch-btn>
                        </div>
                    </div>
                </div>`,
});

// ========= 統計資料來源 ==============================================================================================================================
Vue.component('surveySource', {
    template: ` <section class="survey-item survey-source">
                    <div class="container">
                        <div class="content">
                            <div class="survey-chart-remark">
                                資料來源：富蘭克林坦伯頓基金集團「退休收入策略暨預期調查」（RISE）是採用獨立機構Engine網路市調CARAVAN®進行，針對18歲以上成年男性及女性進行抽樣，並按台灣行政院主計處統計數據進行加權配置。調查時間為2019年7月9日到7月19日，有效樣本數為1,002份。
                            </div>
                        </div>
                    </div>
                </section>`,
});

// ========= 準備退休金頁 退休指南輕鬆看 ==============================================================================================================================
Vue.component('survey1News', {
    data: function () {
        return {
            newsList: {},
        }
    },
    template: ` <div class="guidFilterInfo">
                    <div v-for="news in newsList">
                        <a v-bind:href="'./readnews.html?id=' + news.ArticleId">
                            <div class="guidFilterBlock">
                                <div class="guideFilterBlockImg"><img v-bind:src="news.PictureUrl" v-bind:alt="news.Title"></div>
                                <div class="guideFilterDetail">
                                    <div class="detailInfo"><i class="guideCat">{{ news.Category }}</i><i
                                            class="guideDate">{{ news.ReportDate | onlydate }}</i>
                                        <h3 class="guidInfoTitle">{{ news.Title }}</h3>
                                        <h4 class="guideInfo">{{ news.Abstract }}...</h4>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`,
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            var vm = this;
            var url = sysConfig.apiHost + 'Retirement/GetNewsAllList';
            vm.$http.get(url).then(function (res) {
                vm.newsList = res.body;
            });
        }
    },
    filters: {
        onlydate: function (date) {
            return moment(date).format('YYYY.MM.DD');
        }
    }
});

// ========= 燈箱 ==============================================================================================================================
Vue.component('light-box', {
    data: function () {
        return {
            toggle: false,
            isFixedHeight: false,
        }
    },
    template: `<transition>
                    <div class="lightBox" v-if="toggle">
                        <div class="lightBox-container" :class="{fixedHeight: isFixedHeight}" ref="lightBoxContainer" id="lightBoxContainer">
                            <div class="lightBox-close survey-closeBtn" @click="closeLightBox()">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </div>
                            <div class="lightBox-container-infoArea">
                                <slot name="infoArea"></slot>
                            </div>
                        </div>
                        <div class="lightBox-bg" @click="closeLightBox()"></div>
                    </div>
                </transition>`,
    methods: {
        closeLightBox() {
            this.toggle = false;
        }
    },
});

// ========= 生活類型燈箱 ==============================================================================================================================
Vue.component('lifestyleLightbox', {
    props: ['lifeNo'],
    data: function () {
        return {
            list: [
                {
                    headTit: '簡單生活',
                    headText: '退休生活可以很恬淡，只要平安健康、衣食無憂，就算只是在郊外運動、踏青，只要有所愛之人陪伴，就是一種雋永的幸福！',
                    chartTit: '您知道需要準備多少退休金，才能夠簡單生活呢？',
                    chartText: `假設65歲退休，以國民平均壽命80歲計算，至少還要準備 <span class="focus">811萬</span> 才夠！您準備好了嗎？`,
                    bar1Num: '126',
                    bar2Num: '67',
                    bar3Num: '215',
                    bar4Num: '124',
                    bar5Num: '104',
                    bar6Num: '175',
                    chartRemark: `註：根據主計處106年家庭收支調查結果分析，家庭所得由低至高可分成五組，建議以第三級所得家庭平均每人可支配所得540,850元做為簡單生活的每年生活花費標準。消費支出比例與項目參考主計處家庭消費支出結構按消費型態分類，並加以合併調整，不代表每人實際支出項目。`,
                },
                {
                    headTit: '舒適樂活',
                    headText: '年輕時為家庭辛苦奔忙，退休後讓自己過的舒適點也不為過，生活中多一點質感，多一點舒適享受，人生就是要對自己好一點！',
                    chartTit: '您知道需要準備多少退休金，才能過的舒適樂活呢？',
                    chartText: `假設65歲退休，以國民平均壽命80歲計算，至少還要準備 <span class="focus">1,025萬</span> 才夠！您準備好了嗎？`,
                    bar1Num: '160',
                    bar2Num: '85',
                    bar3Num: '271',
                    bar4Num: '165',
                    bar5Num: '132',
                    bar6Num: '221',
                    chartRemark: `註：根據主計處106年家庭收支調查結果分析，家庭所得由低至高可分成五組，建議以第四級所得家庭平均每人可支配所得683,139元做為舒適樂活的每年生活花費標準。消費支出比例與項目參考主計處家庭消費支出結構按消費型態分類，並加以合併調整，不代表每人實際支出項目。`,
                },
                {
                    headTit: '富足享受',
                    headText: '人生上半場，您為公司與家人而活，現在該是盡情享受人生的時候了，來一場華麗繽紛的美食饗宴吧，開啟精彩富足的第二人生！',
                    chartTit: '您知道需要準備多少退休金，才能擁有富足享受呢？',
                    chartText: `假設65歲退休，以國民平均壽命80歲計算，至少還要準備 <span class="focus">1,671萬</span> 才夠！您準備好了嗎？`,
                    bar1Num: '261',
                    bar2Num: '138',
                    bar3Num: '422',
                    bar4Num: '255',
                    bar5Num: '215',
                    bar6Num: '360',
                    chartRemark: `註：根據主計處106年家庭收支調查結果分析，家庭所得由低至高可分成五組，建議以第五級所得家庭平均每人可支配所得1,114,070元做為富足享受的每年生活花費標準。消費支出比例與項目參考主計處家庭消費支出結構按消費型態分類，並加以合併調整，不代表每人實際支出項目。`,
                },
                {
                    headTit: '夢想人生',
                    headText: '家庭圓滿了，事業登峰了，別忘了還有年輕時寫下的夢想等著您完成，人生最奢侈的，莫過於可以選擇夢想中的退休生活，敬退休！',
                    chartTit: '您知道需要準備多少退休金，才能擁有極致夢想人生呢？',
                    chartText: `假設65 歲退休，以國民平均壽命80歲計算，至少還要準備 <span class="focus">2,356萬</span> 才夠！您準備好了嗎？`,
                    bar1Num: '368',
                    bar2Num: '195',
                    bar3Num: '623',
                    bar4Num: '359',
                    bar5Num: '303',
                    bar6Num: '508',
                    chartRemark: `註：根據主計處106年家庭收支調查結果分析，家庭所得由低至高可分成五組，建議以第五級所得家庭平均每人可支配所得，乘以各級距間的平均倍數約1.41倍，也就是1,570,839元做為夢想人生的每年生活花費標準。消費支出比例與項目參考主計處家庭消費支出結構按消費型態分類，並加以合併調整，不代表每人實際支出項目。`,
                },
            ],
            barHeight: [],
        }
    },
    template: ` <div class="survey-lifestyle-lightBox" :class="'life' + lifeNo">
					<div class="survey-lifestyle-lightBox-head">
						<div class="survey-lifestyle-lightBox-head-content">
							<div class="survey-lifestyle-lightBox-head-content-tit">
								{{ list[lifeNo].headTit }}
							</div>
							<div class="survey-lifestyle-lightBox-head-content-text">
								{{ list[lifeNo].headText }}
							</div>
						</div>
					</div>
					<div class="survey-lifestyle-lightBox-chart-tit">
						{{ list[lifeNo].chartTit }}
					</div>
					<div class="survey-lifestyle-lightBox-chart-text" v-html="list[lifeNo].chartText"></div>
					<div class="survey-lifestyle-lightBox-chart-area">
						<div class="survey-lifestyle-lightBox-chart-area-item">
							<div class="survey-lifestyle-lightBox-chart-area-item-tit">
								日常飲食
							</div>
							<div class="survey-lifestyle-lightBox-chart-area-item-bar" :style="{height: (barHeight[0] ? barHeight[0] : 0 )+'%'}">
								<div class="survey-lifestyle-lightBox-chart-area-item-bar-no">
									<span v-html="list[lifeNo].bar1Num">126</span>萬
								</div>
							</div>
						</div>
						<div class="survey-lifestyle-lightBox-chart-area-item">
							<div class="survey-lifestyle-lightBox-chart-area-item-tit">
								衣著雜支
							</div>
							<div class="survey-lifestyle-lightBox-chart-area-item-bar" :style="{height: (barHeight[1] ? barHeight[1] : 0 )+'%'}">
								<div class="survey-lifestyle-lightBox-chart-area-item-bar-no">
									<span v-html="list[lifeNo].bar2Num">67</span>萬
								</div>
							</div>
						</div>
						<div class="survey-lifestyle-lightBox-chart-area-item">
							<div class="survey-lifestyle-lightBox-chart-area-item-tit">
								居住服務
							</div>
							<div class="survey-lifestyle-lightBox-chart-area-item-bar" :style="{height: (barHeight[2] ? barHeight[2] : 0 )+'%'}">
								<div class="survey-lifestyle-lightBox-chart-area-item-bar-no">
									<span v-html="list[lifeNo].bar3Num">215</span>萬
								</div>
							</div>
						</div>
						<div class="survey-lifestyle-lightBox-chart-area-item">
							<div class="survey-lifestyle-lightBox-chart-area-item-tit">
								醫療保健
							</div>
							<div class="survey-lifestyle-lightBox-chart-area-item-bar" :style="{height: (barHeight[3] ? barHeight[3] : 0 )+'%'}">
								<div class="survey-lifestyle-lightBox-chart-area-item-bar-no">
									<span v-html="list[lifeNo].bar4Num">124</span>萬
								</div>
							</div>
						</div>
						<div class="survey-lifestyle-lightBox-chart-area-item">
							<div class="survey-lifestyle-lightBox-chart-area-item-tit">
								交通資訊
							</div>
							<div class="survey-lifestyle-lightBox-chart-area-item-bar" :style="{height: (barHeight[4] ? barHeight[4] : 0 )+'%'}">
								<div class="survey-lifestyle-lightBox-chart-area-item-bar-no">
									<span v-html="list[lifeNo].bar5Num">104</span>萬
								</div>
							</div>
						</div>
						<div class="survey-lifestyle-lightBox-chart-area-item">
							<div class="survey-lifestyle-lightBox-chart-area-item-tit">
								休閒娛樂
							</div>
							<div class="survey-lifestyle-lightBox-chart-area-item-bar" :style="{height: (barHeight[5] ? barHeight[5] : 0 )+'%'}">
								<div class="survey-lifestyle-lightBox-chart-area-item-bar-no">
									<span v-html="list[lifeNo].bar6Num">175</span>萬
								</div>
							</div>
						</div>
					</div>
					<div class="survey-lifestyle-lightBox-chart-remark" v-html="list[lifeNo].chartRemark">
						註：根據主計處106年家庭收支調查結果分析，家庭所得由低至高可分成五組，建議以第三級所得家庭平均每人可支配所得540,850元做為簡單生活的每年生活花費標準。消費支出比例與項目參考主計處家庭消費支出結構按消費型態分類，並加以合併調整，不代表每人實際支出項目。
					</div>
                </div>`,
    mounted() {
        setTimeout(()=>{
            for (var n=0; n<6; n++) {
                this.setHeight(this.list[this.lifeNo][`bar${n+1}Num`], n);
            };
        }, 1000);
    },
    methods: {
        setHeight(num, n) {
            var arry = [
                    this.list[this.lifeNo].bar1Num,
                    this.list[this.lifeNo].bar2Num,
                    this.list[this.lifeNo].bar3Num,
                    this.list[this.lifeNo].bar4Num,
                    this.list[this.lifeNo].bar5Num,
                    this.list[this.lifeNo].bar6Num
                ],
                max = Math.max.apply(null, arry),
                percentage = max / 100,
                height = num / percentage;

            // this.barHeight[n] = height;
            this.barHeight.push(height);
            // console.log(this.barHeight[n]);
        },
    },
});


var content = new Vue({
    el: '#content',
    data: {
        name: '富蘭克林證券投顧',
        screenWidth: document.body.clientWidth,
        windowWidth: 0,
        windowHeight: 0,
        menuBtnActive: false,
        navbarShow: false,
    },
    mounted() {
        // var $this = this;

        //-------------------------------------wow
        var wow = new WOW({
            callback: (box) => {
                // 判斷含有某個class
                if (box.getAttribute('class').indexOf('digitalAnimation') > -1) {
                    this.digitalAnimation(box);
                }
            },
        });
        wow.init();
        
        window.onload = () => {
            // this.sameHeight('offers-item-info-text');
        }
        this.useJq();
        // this.digitalAnimation();

        $(window).resize(()=>{
            setTimeout(()=>{
                // this.sameHeight('offers-item-info-text');
            }, 300)
        });

        this.$nextTick(() => {
        });
        
    },
    methods: {
        toggleLightBox(name) {
            this.$refs[name].toggle = !this.$refs[name].toggle;
        },
        toggleMobileNavbar() {
            this.menuBtnActive === false ? this.menuBtnActive = true : this.menuBtnActive = false;
            this.navbarShow === false ? this.navbarShow = true : this.navbarShow = false;
        },
        hideMobileNavbar() {
            this.menuBtnActive = false
            this.navbarShow = false
        },
        sameHeight(name) {
            let item = $('.' + name),
                itemLeight = item.length,
                giftItemHeight = [];

            item.removeAttr('style');

            for (let n = 0; n < itemLeight; n++) {
                giftItemHeight[n] = item.eq(n).innerHeight();
            };
            let height = Math.max.apply(null, giftItemHeight);
            item.css('height', height);
        },

        //-------------------------------------使用jq區塊
        useJq() {
            //-------------------------------------signature
            console.log('%cMade by Captain%c2019/08',
                'color: #fff; border-radius: 5px; background: #1a4f9c; padding: 2px 10px; font-weight: bold;',
                'color: #000; border-radius: 5px; background: #ffde00; padding: 2px 10px; margin: 0px 5px;');

            var win_W = $(window).width();                                      // 螢幕寬度
            var win_H = $(window).innerHeight();                                // 螢幕高度
            var win_Scroll = $(window).scrollTop();                             // 捲軸位置
            var thisPath = location.protocol + '//' + location.host;             // 網域
            var n;

            $(window).resize(function (e) {
                win_W = $(window).width();
                win_Scroll = $(window).scrollTop();
            });

            $(window).scroll(function () {
                win_Scroll = $(window).scrollTop();
            });

            //-------------------------------------資安用  target="_blank" 加 rel="nofollow me noopener noreferrer"
            function addNoOpener() {
                var _linkHasTargetBlank = $('a[target="_blank"]');
                for (n = 0; n < _linkHasTargetBlank.length; n++) {
                    // 如果要連的網址跟這網站網域不同  加[rel="nofollow me noopener noreferrer"]
                    _linkHasTargetBlank.eq(n).attr('href').indexOf(thisPath) ? _linkHasTargetBlank.eq(n).attr('rel', 'nofollow me noopener noreferrer') : '';
                };
            }
            addNoOpener();

            //-------------------------------------錨點平滑滾動效果
            $('a[href*="#"]').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var $target = $(this.hash);
                    $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
                    if ($target.length) {
                        var targetOffset = $target.offset().top;
                        $('html,body').animate({
                            scrollTop: targetOffset
                        },
                            1000);
                        return false;
                    }
                }
            });

            //-------------------------------------ie用的遮罩
            setTimeout(()=>{
                $('.ieUseMask').fadeOut();
            }, 4000);
        },

        //-------------------------------------播放聲音
        playVoice(hz) {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            (function () {
                if (!window.AudioContext) {
                    console.log('當前瀏覽器不支援Web Audio API');
                    return;
                }

                // 創建新的音頻上下文接口
                var audioCtx = new AudioContext();

                // 發出的聲音頻率數據，表現為音調的高低(赫茲Hz)
                var arrFrequency = [hz, hz];

                // 音調依次遞增或者遞減處理需要的參數
                var start = 0, direction = 1;

                // 當前頻率
                var frequency = arrFrequency[start];
                // 如果到頭，改變音調的變化規則（增減切換）
                if (!frequency) {
                    direction = -1 * direction;
                    start = start + 2 * direction;
                    frequency = arrFrequency[start];
                }
                // 改變索引，下一次hover時候使用
                start = start + direction;

                // 創建一個OscillatorNode, 它表示一個週期性波形（振盪），基本上來說創造了一個音調
                var oscillator = audioCtx.createOscillator();
                // 創建一個GainNode,它可以控制音頻的總音量
                var gainNode = audioCtx.createGain();
                // 把音量，音調和終節點進行關聯
                oscillator.connect(gainNode);
                // audioCtx.destination返回AudioDestinationNode對象，表示當前audio context中所有節點的最終節點，一般表示音頻渲染設備
                gainNode.connect(audioCtx.destination);
                // 指定音調的類型，其他還有sine|square|triangle|sawtooth
                oscillator.type = 'triangle';
                // 設置當前播放聲音的頻率，也就是最終播放聲音的調調
                oscillator.frequency.value = frequency;
                // 當前時間設置音量為0
                gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
                // 0.01秒後音量為1
                gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
                // 音調從當前時間開始播放
                oscillator.start(audioCtx.currentTime);
                // 1秒內聲音慢慢降低，是個不錯的停止聲音的方法
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
                // 1秒後完全停止聲音
                oscillator.stop(audioCtx.currentTime + 1);

            })();
        },

        //-------------------------------------數字遞增動畫
        digitalAnimation(box) {
            var no = $(box).attr('data-digital_animation'),
                x = 1,
                // time = no > 30 ? 25 : 50;
                time = (300 / no) * 5;

            var t = setInterval(function () {
                $(box).text(x++);
                if (x - 1 == no) {
                    clearInterval(t);
                }
            }, time);
        },
    },
    watch: {
        screenWidth(val) {
            this.screenWidth = val
        },
    },
});