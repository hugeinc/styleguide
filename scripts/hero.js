import $ from 'jquery'

export default {
	init: function() {
		this.$header = $('header')
		this.$main = $('main')
		this.$heroHome = $('header.home .bg')
		this.$heroInner = $('header.inner .bg')
		this.reloadFixed = false
		this.scrolledToMain = false

		if(this.$heroHome.length) {
			this.parallaxHome()
		}
		if(this.$heroInner.length) {
			this.parallaxInner()
		}
	},
	parallaxHome: function() {
		var _this = this,
			homeHeroHeight = this.$heroHome.height(),
			headerHeight = this.$header.height(),
			fixed = false,
			previousScrollTop = 0

		// if($(window).scrollTop() >= 100 && !this.reloadFixed) {
		// 	$('body').addClass('home-fixed-reload')
		// 	// if(!_this.scrolledToMain && $(window).scrollTop() < $('main').offset().top - 50) $('html, body').animate({ scrollTop: $('main').offset().top - 50 }, 0)
		// 	this.reloadFixed = true
		// 	this.scrolledToMain = true
		// }

		$(window).on('scroll', function(e) {
			var scrollTop = $(window).scrollTop(),
				y = scrollTop / 2,
				o = 1 - ((scrollTop / homeHeroHeight) * 3),
				oFaster = 1 - ((scrollTop / homeHeroHeight) * 6),
				newHeight = headerHeight - (y * 5)

				// console.log(fixed)
			if(scrollTop >= 550 && !fixed && scrollTop > previousScrollTop) {
				$('body').addClass('home-fixed')
				// if(!_this.scrolledToMain) $('html, body').animate({ scrollTop: 2 }, 800)
				// setTimeout(function() {
					fixed = true
					previousScrollTop = scrollTop
				// }, 800)
				_this.scrolledToMain = true
				return false
			} else if (scrollTop < 551 && fixed && scrollTop < previousScrollTop) {
				$('body').removeClass('home-fixed home-fixed-reload')
				// $('html, body').animate({ scrollTop: 2 }, 800)
				_this.reloadFixed = false
				_this.scrolledToMain = false
				// setTimeout(function() {
					fixed = false
					previousScrollTop = scrollTop
				// }, 800)
			}

			// _this.$heroHome.css({
			// 	'background-position':  'center ' + -(y * 2) + 'px',
			// 	'opacity': o
			// })

			// _this.$header.css({'height' : newHeight}).find('.container').css({
			// 	'-webkit-transform': 'translate3d(0, -' + (y * 2) + 'px, 0)',
			// 	'-ms-transform': 'translate3d(0, -' + (y * 2) + 'px, 0)',
			// 	'-o-transform': 'translate3d(0, -' + (y * 2) + 'px, 0)',
			// 	'transform': 'translate3d(0, -' + (y * 2) + 'px, 0)',
			// 	'opacity': oFaster
			// })

			// _this.$main.css({'margin-top' : newHeight + scrollTop})
		})
	},
	parallaxInner: function() {
		var _this = this,
			onLoadScrollTop = $(window).scrollTop()

		if(onLoadScrollTop >= 35 && !this.reloadFixed) {
			_this.$header.addClass('inner-fixed-reload')
			if(!_this.scrolledToMain && (onLoadScrollTop < $('main').offset().top - 50)) $('html, body').animate({ scrollTop: $('main').offset().top - 50 }, 0)
			this.reloadFixed = true
			this.scrolledToMain = true
		}

		$(window).on('scroll', function(e) {
			var scrollTop = $(window).scrollTop()

			if(scrollTop >= 35 && !_this.reloadFixed) {
				_this.$header.addClass('inner-fixed')
				// if(!_this.scrolledToMain) $('html, body').animate({ scrollTop: $('main').offset().top - 50 }, 800)
				_this.scrolledToMain = true
				return false
			} else if(scrollTop < 35) {
				_this.$header.removeClass('inner-fixed inner-fixed-reload')
				_this.reloadFixed = false
				_this.scrolledToMain = false
			}
		})
	}
}