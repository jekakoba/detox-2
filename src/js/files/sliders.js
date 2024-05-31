
//========================================================================================================================================================
import Swiper from 'swiper';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import "../../scss/base/swiper.scss";

// ? Sliders ========================================================================================================================================================

function initSliders() {
	if (document.querySelector('.testimonials__slider')) {
		new Swiper('.testimonials__slider', {
			modules: [Navigation, Pagination, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			speed: 800,
			spaceBetween: 120,
			loop: true,
			centeredSlides: true,
			loopAdditionalSlides: 1,
			navigation: {
				prevEl: '.navigation__button_prev',
				nextEl: '.navigation__button_next',
			},

			pagination: {
				el: '.testimonials__pagination',
				clickable: true,
			},

			autoplay: {
				delay: 3000,
				disableOnInteraction: true
			},

			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 20,
				},
				767.98: {
					slidesPerView: 1,
					spaceBetween: 120,
				},
			},


			on: {
				init() {
					this.el.addEventListener('mouseenter', () => {
						this.autoplay.stop();
					})

					this.el.addEventListener('mouseleave', () => {
						this.autoplay.start();
					})
				}
			}

		})
	}

}


// ? Sliders Resize ========================================================================================================================================================

// Слайдер з перевагами
function blogSlider(sliderEl) {
	if (document.querySelector('.blog__slider')) {
		return new Swiper('.blog__slider', {
			modules: [Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 2.2,
			spaceBetween: 15,
			speed: 800,
			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 15,

				},
				500: {
					slidesPerView: 2.2,

				},
			},

			pagination: {
				el: '.blog__pagination',
				clickable: true,
			},
		})
	}
}

// Слайдер з блогом



// ? Resize functions ========================================================================================================================================================

function changeSliders(sliderFunc, breakpoint) {
	let currentMode
	let sliderEl = null

	function handleResize() {
		let globalWindowWidth = document.documentElement.clientWidth
		if (globalWindowWidth <= breakpoint && currentMode !== 'mobile') {
			sliderInit()
			currentMode = 'mobile'
		} else if (globalWindowWidth > breakpoint && currentMode !== 'desktop') {
			removeSlider()
			currentMode = 'desktop'
		}
	}

	function sliderInit() {
		sliderEl = sliderFunc(sliderEl)
	}

	function removeSlider() {
		if (sliderEl && !sliderEl.isDestroyed) {
			sliderEl.destroy(true, true)
			sliderEl = null
		}
	}

	handleResize()
	window.addEventListener('resize', handleResize)
}

window.addEventListener("load", function (e) {
	initSliders()
	changeSliders(blogSlider, 767.98)
})


