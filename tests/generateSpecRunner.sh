pushd tests > /dev/null

cat SpecRunner.begin.html > SpecRunner.html

sed -n -e '/^<body>$/,/^<\/body>$/{/^<body>$/d;/^<\/body>$/d;s/src="/src="..\/src\//;p;}' ../src/mastermind.html >> SpecRunner.html

cat SpecRunner.end.html >> SpecRunner.html

echo "Open tests/SpecRunner.html in a browser to run the tests."

popd > /dev/null
