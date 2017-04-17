
from random import randint
from lxml import html
import requests

# Given a bussiness id returns info about it calling the yelp API
def users_data(id):
    url = 'https://www.yelp.com/user_details?userid=' + id
    page = requests.get(url)
    tree = html.fromstring(page.content)

    user_avatar = tree.xpath('//div[@class="photo-slideshow_image"]/a/img/@src')[0]
    user_name = tree.xpath('//div[contains(@class, "user-profile_info")]/h1/text()')[0]
    user_location = tree.xpath('//div[contains(@class, "user-profile_info")]/h3[contains(@class, "user-location")]/text()')[0]

    return {
        'id': id,
        'image': user_avatar,
        'name': user_name,
        'location': user_location,
        'url': url
    }


