rm -rf in/shp/reprojected
mkdir in/shp/reprojected
rm app/geo/faritra.json
ogr2ogr -f "ESRI Shapefile" in/shp/reprojected/mada.shp in/shp/MadagascarAdmin2.shp -t_srs EPSG:4326
./node_modules/.bin/mapshaper in/shp/reprojected/mada.shp -simplify dp 0.1% -o format=geojson app/geo/faritra.json