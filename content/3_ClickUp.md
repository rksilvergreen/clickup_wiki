# 3 ClickUp

## 3.1 Fields
### 3.1.1 Base scope fields
These are fields that are part of ClickUp’s core task model. They exist across the platform by default, even if you don’t show them as columns in a view.
#### 3.1.1.1 Base Scope Table

| Name | Description | Field Type | Computational |
| ---| ---| ---| --- |
| Task ID | System task identifier. | Text | No |
| Custom Task ID | Workspace custom identifier (if enabled). | Text | No |
| Task name | Task title. | Text | No |
| Description | Main rich-text body. | Text area | No |
| Status | Workflow state. | Status | No |
| Task type | Task classification. | Task Type | No |
| Priority | Urgency/importance. | Priority | No |
| Assignees | Responsible people (users/teams). | People | No |
| Followers / Watchers | Subscribed people. | People | No |
| Start date | Planned start timestamp. | Date | No |
| Due date | Planned due timestamp. | Date | No |
| Time estimate | Planned effort. | Time Estimate | No |
| Time tracked | Logged work time. | Time Tracked | Yes |
| Lists | List membership (home + additional lists). | Lists | No |
| Tags | Categorization tags. | Tags | No |
| Dependencies | Blocking / waiting relationships. | Dependencies | No |
| Linked tasks | Non-blocking links to other tasks. | Relationship | No |
| Linked Docs | Links to Docs. | Relationship | No |
| Subtasks | Child tasks under this task. | Relationship | No |
| Parent task | Parent (if this is a subtask). | Relationship | No |
| Checklists | Checklist items within the task. | Text area | No |
| Attachments | Files attached to the task. | Files | No |
| Comments | Task comment thread content. | Text area | No |
| Assigned comments | Assignable/resolvable comments. | Text area | No |
| Latest comment | Most recent comment (as a column). | Text area | Yes |
| Created by | Creator user. | People | No |
| Date created | Creation timestamp. | Date | No |
| Date updated | Last-updated timestamp. | Date | Yes |
| Date done | Completion timestamp. | Date | Yes |
| Date closed | Closed timestamp. | Date | Yes |
| Pull Requests | Linked PRs via integration. | Relationship | Yes |
| Sprints | Sprint association (if enabled). | Relationship | No |

#### 3.1.1.2 ClickUp's inadequacy
ClickUp has one core object: a task. So no matter what you’re trying to model, every entry is forced to inherit the same base schema— fields like assignee, due date, priority, and workflow status.
That’s fine when the entry _is_ a work item, but it becomes a mismatch when the entry represents something else entirely, like a record or event. Those fields are either meaningless or create the wrong mental model, and while you can hide some columns in specific views, you can’t truly remove the task-shaped defaults across ClickUp.
### 3.1.2 Custom Fields
These are fields you create and attach to **scopes**. In practice, scopes include location scopes (Spaces/Folders/Lists) and also non-location scopes such as Task Types. A Custom Field becomes available wherever its scope applies.
## 3.2 Field Types
### 3.2.1 Field-type families
#### 3.2.1.1 System-only field types
Some field types exist only as part of ClickUp’s built-in system and aren’t available as Custom Field types you can create. Examples include Lists, Status, Task Type, Tags, Priority, Dependencies, and Time Estimate.
#### 3.2.1.2 Parameterized field types
Some field types aren’t “complete” until you define parameters such as an option set, a scale, a range, or a referenced target.
Common parameter patterns include option sets (Dropdown, Labels), scales (Rating), ranges (Progress Manual), and relationship/selection configuration (Rollup).
#### 3.2.1.3 Computational field types
Some fields represent derived values rather than directly-entered values. Examples include Formula and Progress (Auto).
#### 3.2.1.4 AI field types
AI fields are computational fields whose values are generated or inferred using AI, typically based on task content plus configuration.
Examples include Summary, Sentiment, Categorize, Custom Text, Custom Dropdown, Progress Updates, Translation, T-Shirt Size, and Action Items.
#### 3.2.1.5 Scope-selecting field types
Some fields determine which scopes apply to a task (and therefore influence what else becomes relevant or available). There are two of these: Lists and Task Type.
### 3.2.2 Field Types Table

| Field type | Description | System-only field type | Parameters | Computational | AI | Scope Selecting |
| ---| ---| ---| ---| ---| ---| --- |
| Lists | Multi-valued field of ClickUp lists | Yes | Set of lists, representing the leaves of the location scope hierarchy.<br>Defined per workspace. | No | No | Yes |
| Status | Single-choice state field representing the entry’s workflow state. | Yes | Set of labels.<br>Defined per location. | No | No | No |
| Task Type | Single-choice classification field selecting the task’s type. | Yes | Set of labels.<br>Defined per workspace. | No | No | Yes |
| Tags | Multi-valued label field referencing tag objects used for categorization. | Yes | Set of labels.<br>Defined per space. | No | No | No |
| Description | Rich-text content field for task narrative/specification. | Yes | \- | No | No | No |
| Comment | ClickUp comments | Yes |  | No | No | No |
| Priority | Single-choice urgency/importance field. | Yes | \- | No | No | No |
| Duration | Duration value representing planned span between start and end (when enabled). | Yes | \- | No | No | No |
| Dependencies | Relationship field expressing blocking / waiting relationships between tasks. | Yes | \- | No | No | No |
| Time Estimate | Duration value representing expected effort. | Yes | \- | No | No | No |
| Time Tracked | Duration value representing recorded effort. | Yes | \- | ? | No | No |
| Sprint Points | Numeric estimation field (story points) for sprint planning. | Yes | \- | No | No | No |
| Action Items | Generates actionable follow-up items inferred from task content. | No | Configuration | Yes | Yes | No |
| Button | Manual trigger field used to initiate configured automation behavior from an entry. | No | Configuration | No | No | No |
| Categorize | Assigns tasks into dropdown categories using AI, optionally guided by custom instructions and task variables. | No | Configuration | Yes | Yes | No |
| Checkbox | Boolean field. | No | \- | No | No | No |
| Custom Dropdown | Generates/assigns values for a dropdown AI Field according to a user-defined prompt and configured dropdown options. | No | Configuration | Yes | Yes | No |
| Custom Text | Generates text output according to a user-defined prompt to fill a text-based AI Field. | No | Configuration | Yes | Yes | No |
| Date | Date/time field. | No | \- | No | No | No |
| Dropdown | Single-choice categorical field with a finite option set. | No | Set of labels | No | No | No |
| Email | Email-address formatted string field. | No | \- | No | No | No |
| Files | Field holding file attachments (uploaded or cloud-linked). | No | \- | No | No | No |
| Formula | Computed field defined as an expression over other fields. | No | Expression | Yes | No | No |
| Labels | Multi-valued categorical field using a defined option set. | No | Set of labels | No | No | No |
| Location | Address/location field (map/geocoded address representation). | No | \- | No | No | No |
| Money | Currency-typed numeric field. | No | Currency | No | No | No |
| Number | Numeric field. | No | \- | No | No | No |
| People | People selector field (users and optionally Teams). | No | Set of users.<br>Defined per workspace | No | No | No |
| Phone | Phone-number formatted string field with country/area code support. | No | \- | No | No | No |
| Progress (Auto) | Automatically computed progress value based on completion of specified action items (e.g., subtasks/checklists). | No | Configuration | Yes | No | No |
| Progress (Manual) | Manually set progress value over a configured numeric range. | No | Min/Max | No | No | No |
| Progress Updates | Generates a synthesized progress update for tasks based on recent task activity within a selected time window and output format. | No | Configuration | Yes | Yes | No |
| Rating | Ordinal rating field using a configured scale. | No | Scale | No | No | No |
| Relationships | Field representing links between tasks via relationship edges. | No | Location | No | No | No |
| Rollup | Field that displays selected fields from related tasks. | No | Relationship + Field | Yes | No | No |
| Sentiment | Classifies task sentiment as positive, neutral, or negative using task content (including description, Custom Fields, and comments). | No | Configuration | Yes | Yes | No |
| Signature | Signature capture field (typed or drawn). | No | \- | No | No | No |
| Summary | Generates a concise representation of task content (e.g., description, attachments, and conversations) as a summary in a selected format. | No | Configuration | Yes | Yes | No |
| T-Shirt Size | Estimates task size/effort using t-shirt sizing based on task data and contextual information from its List. | No | Configuration | Yes | Yes | No |
| Text | Single-line text field. | No | \- | No | No | No |
| Text area / Long Text | Multi-line text field with rich text support. | No | \- | No | No | No |
| Translation | Translates a selected task property (title or description) into a specified target language. | No | Configuration | Yes | Yes | No |
| Voting | Vote-count field used for prioritization/sentiment-style scoring. | No | Emoji | No | No | No |
| Website | URL field. | No | No | No | No | No |

## 3.3 Scope
These are the two scope hierarchies used in ClickUp—one that answers “which project context is this entry part of?”, and one that answers “what kind of entry is this meant to represent?”.
### 3.3.1 Location Scope Hierarchy
This is the **project hierarchy**: the chain of project containers an entry sits inside. A space usually represents a broad domain (like a product area or department), folders group related sub-projects inside that domain, and lists are often the concrete project boards/pipelines where work is tracked day-to-day. When an entry belongs to a specific list, it’s automatically part of the larger project contexts above it too—so the entry is simultaneously in the “sub-project” scope (the list) and in the broader “project” scopes (its folder and space). That’s why location scopes behave like inheritance: lower-level project contexts don’t replace higher-level ones; they narrow them.

- 🟦 General (space)
  - 📁 Some Project (folder)
    - 📋 Project Tasks (list)
  - 📁 Household Chores (folder)
    - 📋 Household Tasks (list)
    - 📋 Family Meetings (list)
  - 📋 Events (list)
  - 📋 Milestones (list)
- 🟩 Personal (space)
  - 📁 My Projects (folder)
    - 📁 Birthday Planning (folder)
      - 📋 Locations (list)
      - 📋 Presents (list)

### 3.3.2 Task Type Scope Hierarchy
This is the **purpose hierarchy** (even though ClickUp implements it as flat). A task type scope doesn’t say _where_ the entry lives; it says _what it is_. It’s the semantic category of the entry—what kind of data it represents and what it’s intended to be used for. For example, two entries can live in the same project scope, but have different purposes (a bug vs. a feature request vs. a meeting note), and that difference is captured by task type. In ClickUp, choosing a task type selects exactly one purpose scope with no inheritance: it doesn’t automatically imply a more general “parent type” scope. It’s a single-purpose label that lets you treat entries differently based on meaning, not location.

- ✅ Task
- 📆 Event
- 🗨️ Request
- 🫱🏼‍🫲🏼 Meeting
- 🏆 Goal