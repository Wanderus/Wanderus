import requests
import json
import csv

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
	data_file = open('data.csv', 'w+')

	# create a csv writer object
	csv_writer = csv.writer(data_file)

	geonames = resp.json()['geonames']

	count = 0

	for item in geonames:
		# if we are at the first row, create the headings
		if count == 0:
			header = item.keys()

			csv_writer.writerow(header)

			count += 1

		# write each object as one row
		csv_writer.writerow(item.values())

	# close the file
	data_file.close()


