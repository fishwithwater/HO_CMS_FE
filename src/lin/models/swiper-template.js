import {
  get, post, put, _delete,
} from '../utils/http'

export default class SwiperTemplate {
  constructor(page = 0, count = 10) {
    this.page = page
    this.count = count
  }

  async incresePage() {
    this.page += 1
  }

  async decresePage() {
    this.page -= 1
    if (this.page < 0) {
      this.page = 0
    }
  }


  static async getList({count = this.count, page = this.page}) {
    return await get('v1/swiper-template/', {
      count,
      page,
    })
  }

  async nextPage() {
    await this.incresePage()
    return this.getLists({})
  }

  async prePage() {
    await this.decresePage()
    return this.getLists({})
  }
}