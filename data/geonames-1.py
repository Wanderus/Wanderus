import requests
import json

#encode_place = encodeURI('DC')

resp = requests.get('http://api.geonames.org/searchJSON?q=' + 'park' + '&country=US' + '&adminCode1=DC' + '&username=rhsu0268')

# handle errors with ApiError
if resp.status_code != 200:
	raise ApiError('GET /places/ {}'.format(resp.status_code))
else:
	# print the json output for testing
	#print(resp.json())

	# file creation 

	# open the file for reading and writing - w+
	data_file = open('data.txt', 'w+')

	# write the json to the file
	data = resp.json()

	geonames = resp.json()['geonames']
	total_results_count = resp.json()['totalResultsCount']

	for item in geonames:
		#print(item['fcodeName'])
		item_string = str(item)
		data_file.write(item_string + '\n')

	print(total_results_count)

	# close the file
	data_file.close()


