
from random import randint
from lxml import html
import requests

# Given a bussiness id returns info about it calling the yelp API
def users_data(id):
    # TODO Yelp api integration
    # sample here https://github.com/Yelp/yelp-fusion/blob/master/fusion/python/sample.py
    return {
        'id': id,
        'image': 'https://s3-media3.fl.yelpcdn.com/bphoto/GAOokILdhJmA5Pn0Z9vYqw/ls.jpg',
        'name': 'Lolita ' + str(randint(0,9)),
        'url': 'https://www.yelp.com/biz/lolita-philadelphia-2'
    }

def scrape_users_data(id):
	# http://python-guide-pt-br.readthedocs.io/en/latest/scenarios/scrape/
	page = requests.get('https://www.yelp.com/user_details?userid=' + id)
	tree = html.fromstring(page.content)
	user_avatar = tree.xpath('//div[@class="photo-slideshow_image"]/a/img/@src')
	print user_avatar

if __method__=="__main__":
	scrape_users_data("bQ7fQq1otn9hKX-gXRsrgA")

