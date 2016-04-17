import requests
import json

from geopy import geocoders

#encode_place = encodeURI('DC')

import geocoder
g = geocoder.google([45.15, -75.14], method='reverse')
print(g.geojson)
print(g.postal)


resp = requests.get('http://api.geonames.org/searchJSON?q=' + 'park' + '&country=US' + '&adminCode1=DC' + '&username=rhsu0268')

# handle errors with ApiError
if resp.status_code != 200:
	raise ApiError('GET /places/ {}'.format(resp.status_code))
else:
	# print the json output for testing
	#print(resp.json())

	# file creation 

	# open the file for reading and writing - w+
	data_file = open('processed_data.json', 'w+')

	# write the json to the file
	data = resp.json()

	geonames = resp.json()['geonames']
	total_results_count = resp.json()['totalResultsCount']

	d = {}

	#d = []
	d['parks'] = {}
	#d['parks'].append({'_model': 'Location'})
	d['parks']['_model'] = 'Location'

	count = 0

	for item in geonames:
		#print(item['placename'])

		# store the toponymName
		#place_name = item['toponymName']

		lat = item['lat']
		lng = item['lng']

		g = geocoder.google([lat, lng], method='reverse')

		postal_code = g.postal

		item['postal'] = postal_code

		# get the zipcode
		#zip_resp = requests.get('http://api.geonames.org/postalCodeSearchJSON?placename=' + place_name + '&adminCode1=DC' + '&maxRows=1&username=rhsu0268')

		#if zip_resp.status_code == 200:
			#print(zip_resp.json())\

		#json_data['locations'].append

		item_string = str(item)
		#print(item_string)

		#json_data = json.dumps([dict(data=item)])
		#json_data = json.dumps(item)
		#print(json_data)
		#d['parks'].append({ 'places' + str(count) : item })
		d['parks']['places' + str(count)] = item
		#d['parks'].append(item)


		#d['parks']['places' + str(count)].append(item)
		#d.append(json_data)
		#data_file.write(item_string + '\n')
		count = count + 1

	print(d)
	print(d['parks']['_model'])


	#dict_to_json = json.dumps([dict(data=new_data) for new_data in d])
	dict_to_json = json.dumps(d)
	#print(dict_to_json)

	# write the data to the file
	data_file.write(dict_to_json)

	# close the file
	data_file.close()


