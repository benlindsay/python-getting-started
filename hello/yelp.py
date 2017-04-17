
from random import randint
from lxml import html
import requests

# Given a bussiness id returns info about it calling the yelp API
def users_data(id):
    url = 'https://www.yelp.com/user_details?userid=' + id
    page = requests.get(url)
    tree = html.fromstring(page.content)

    user_avatar = tree.xpath('//div[@class="photo-slideshow_image"]/a/img/@src')
    if user_avatar:
        user_avatar = user_avatar[0]
    else:
        user_avatar = ''

    user_name = tree.xpath('//div[contains(@class, "user-profile_info")]/h1/text()')
    if user_name:
        user_name = user_name[0]
    else:
        user_name = ''
    # user_location = tree.xpath('//div[contains(@class, "user-profile_info")]/h3[contains(@class, "user-location")]/text()')

    return {
        'id': id,
        'image': user_avatar,
        'name': user_name,
        # 'location': user_location,
        'url': url
    }


