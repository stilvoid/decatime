all: index.html original.js
	closure --compilation_level ADVANCED_OPTIMIZATIONS original.js > decatime.js

clean:
	rm decatime.js
