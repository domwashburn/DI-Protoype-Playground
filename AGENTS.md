
# Plans
Plans are accessed, storred, and maintained in .tmp/plans.
If the directory does not exist, make it.

the file format is `Plan_Name.plan.md`

new plans must have the following front matter:
```
---
Plan-name: // A simple title for the plan
Protoype(s): // relative/path/to/prototype or prototypes in the case of migration
Date-created: // the date this plan was created
Origin-Chat-ID: // the ID string of the chat that generated this plan
Chat-session-IDs: [] // list of the chat sessions used to execute this plan
Implementation status: // not started, in progress, complete, abandoned, invalid
Next-step: // the next step a human or model should take given the status
---
```

## temporary files
temporary files like Playwrite screenshots should be storred in the `.tmp` directory in the repo root. More information can be found there.