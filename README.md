# This is a prototype for Enroly Apply

## Problems addressing:

1. Manage page flow (show what page next)
2. Manage page flow validation at run time - what if we don't need to show next page because of x

### Manage page flow (show what page next)

Solution - route path managed by the server not remix. A config object contains this information. See TaskConfig app/server/data/taskConfig.ts

Motivation: Based on the idea of HATEAOS we can return an object `ClientTask<Task>` that contains information about the current task and what actions are available (e.g. save, back, ship) (Not got this bit quite right - currently only actions are prevRoute and nextRoute)

### Manage page flow validation at run time - what if we don't need to show next page because of x

Solution - Chain Of responsibility pattern implemented by AbstractTaskValidator

Motivation: I want to be able to skip tasks at runtime if they are not applicable. Maybe, as in the requirements, there is a different page flow due to registration status or due to the data supplied by the student.

##
To run
```
pnpm dev
```

> see LOOM https://www.loom.com/share/9a2c2e6496f34b67ba140941c1ec1596?sid=e6548c5a-43b3-4c11-86ee-2d3aae9e35e7
