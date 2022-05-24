from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome(executable_path='chromedriver')
driver.get('https://solved.ac/profile/q9922000')
# search = driver.find_element_by_css_selector('#__next > div.ProfileLayout__Background-sc-1nlq07q-0.bVKlxK > div.contents.no_top_margin > div:nth-child(1) > div.ProfileRatingCard__ProblemsContainer-sc-989yd6-3.kBcVFT > div:nth-child(1) > div:nth-child(1) > a > img')
# print(search.get_attribute('alt'))