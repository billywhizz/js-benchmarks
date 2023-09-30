TASKSET=taskset --cpu-list 0
SCRIPT=utf8.mjs

node:
	${TASKSET} node ${SCRIPT} > results.node.json

bun:
	${TASKSET} bun ${SCRIPT} > results.bun.json

bun-smol:
	${TASKSET} bun --smol ${SCRIPT} > results.bun-smol.json

deno:
	${TASKSET} deno run -A ${SCRIPT} > results.deno.json

spin:
	${TASKSET} spin ${SCRIPT} > results.spin.json

just:
	${TASKSET} just --esm ${SCRIPT} > results.just.json

all:
	make node bun bun-smol deno spin just

popular:
	make node bun deno bun-smol

clean:
	rm -f results.*.json
