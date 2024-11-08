import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { renderPost } from "../templates/post.template";

export class FavoriteComponent extends Component {
	constructor(id, options) {
		super(id)

		this.loader = options.loader
	}

	init() {
		this.$el.addEventListener('click', linkClickHandler.bind(this))
	}

	onShow() {
		const favorites = JSON.parse(localStorage.getItem('favorites'))
		const html = renderList(favorites)
		this.$el.insertAdjacentHTML('afterBegin', html)
	}

	onHide() {
		this.$el.innerHTML = ''
	}
}

async function linkClickHandler(event) {
	event.preventDefault()

	if (event.target.classList.contains('js-link')) {
		const postId = event.target.dataset.id;
		this.$el.innerHTML = ''
		this.loader.show()
		const post = await apiService.fetchpostById(postId)
		this.loader.hide()
		this.$el.insertAdjacentHTML('afterBegin', renderPost(post, { withButton: false }))
	}
}


function renderList(list = []) {
	if (list && list.length) {
		return `
			<ul>
				${list.map(i => `<li><a href="#" class="js-link" data-id="${i.id}">${i.title}</a></li>`).join(' ')}
			</ul>
		`
	}

	return `<p class="center">You did not add items yet</p>`
}