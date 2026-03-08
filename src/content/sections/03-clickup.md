---
title: "ClickUp"
order: 3
---

<h1 id="sec-3">3. ClickUp</h1>
      <h2 id="sec-3-1">3.1 Fields</h2>
      <h3 id="sec-3-1-1">3.1.1 Base Scope Fields</h3>
      <p>These are fields that are part of ClickUp’s core task model. They exist across the platform by default, even if
        you don’t show them as columns in a view.</p>
      <h4 id="sec-3-1-1-1">3.1.1.1 Base Scope Table</h4>
      <div class="doc-table-wrap">
        <table class="doc-base-scope-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Field Type</th>
              <th>Computational</th>
            </tr>
          </thead>
          <tbody>
            <tr id="row-task-id">
              <td>Task ID</td>
              <td>System task identifier.</td>
              <td><a href="#row-ft-text">Text</a></td>
              <td>No</td>
            </tr>
            <tr id="row-custom-task-id">
              <td>Custom Task ID</td>
              <td>Workspace custom identifier (if enabled).</td>
              <td><a href="#row-ft-text">Text</a></td>
              <td>No</td>
            </tr>
            <tr id="row-task-name">
              <td>Task name</td>
              <td>Task title.</td>
              <td><a href="#row-ft-text">Text</a></td>
              <td>No</td>
            </tr>
            <tr id="row-description">
              <td>Description</td>
              <td>Main rich-text body.</td>
              <td><a href="#row-ft-text-area-long-text">Text area</a></td>
              <td>No</td>
            </tr>
            <tr id="row-status">
              <td>Status</td>
              <td>Workflow state.</td>
              <td><a href="#row-ft-status">Status</a></td>
              <td>No</td>
            </tr>
            <tr id="row-task-type">
              <td>Task type</td>
              <td>Task classification.</td>
              <td><a href="#row-ft-task-type">Task Type</a></td>
              <td>No</td>
            </tr>
            <tr id="row-priority">
              <td>Priority</td>
              <td>Urgency/importance.</td>
              <td><a href="#row-ft-priority">Priority</a></td>
              <td>No</td>
            </tr>
            <tr id="row-assignees">
              <td>Assignees</td>
              <td>Responsible people (users/teams).</td>
              <td><a href="#row-ft-people">People</a></td>
              <td>No</td>
            </tr>
            <tr id="row-followers-watchers">
              <td>Followers / Watchers</td>
              <td>Subscribed people.</td>
              <td><a href="#row-ft-people">People</a></td>
              <td>No</td>
            </tr>
            <tr id="row-start-date">
              <td>Start date</td>
              <td>Planned start timestamp.</td>
              <td><a href="#row-ft-date">Date</a></td>
              <td>No</td>
            </tr>
            <tr id="row-due-date">
              <td>Due date</td>
              <td>Planned due timestamp.</td>
              <td><a href="#row-ft-date">Date</a></td>
              <td>No</td>
            </tr>
            <tr id="row-time-estimate">
              <td>Time estimate</td>
              <td>Planned effort.</td>
              <td><a href="#row-ft-time-estimate">Time Estimate</a></td>
              <td>No</td>
            </tr>
            <tr id="row-time-tracked">
              <td>Time tracked</td>
              <td>Logged work time.</td>
              <td><a href="#row-ft-time-tracked">Time Tracked</a></td>
              <td>Yes</td>
            </tr>
            <tr id="row-lists">
              <td>Lists</td>
              <td>List membership (home + additional lists).</td>
              <td><a href="#row-ft-lists">Lists</a></td>
              <td>No</td>
            </tr>
            <tr id="row-tags">
              <td>Tags</td>
              <td>Categorization tags.</td>
              <td><a href="#row-ft-tags">Tags</a></td>
              <td>No</td>
            </tr>
            <tr id="row-dependencies">
              <td>Dependencies</td>
              <td>Blocking / waiting relationships.</td>
              <td><a href="#row-ft-dependencies">Dependencies</a></td>
              <td>No</td>
            </tr>
            <tr id="row-linked-tasks">
              <td>Linked tasks</td>
              <td>Non-blocking links to other tasks.</td>
              <td><a href="#row-ft-relationships">Relationship</a></td>
              <td>No</td>
            </tr>
            <tr id="row-linked-docs">
              <td>Linked Docs</td>
              <td>Links to Docs.</td>
              <td><a href="#row-ft-relationships">Relationship</a></td>
              <td>No</td>
            </tr>
            <tr id="row-subtasks">
              <td>Subtasks</td>
              <td>Child tasks under this task.</td>
              <td><a href="#row-ft-relationships">Relationship</a></td>
              <td>No</td>
            </tr>
            <tr id="row-parent-task">
              <td>Parent task</td>
              <td>Parent (if this is a subtask).</td>
              <td><a href="#row-ft-relationships">Relationship</a></td>
              <td>No</td>
            </tr>
            <tr id="row-checklists">
              <td>Checklists</td>
              <td>Checklist items within the task.</td>
              <td><a href="#row-ft-text-area-long-text">Text area</a></td>
              <td>No</td>
            </tr>
            <tr id="row-attachments">
              <td>Attachments</td>
              <td>Files attached to the task.</td>
              <td><a href="#row-ft-files">Files</a></td>
              <td>No</td>
            </tr>
            <tr id="row-comments">
              <td>Comments</td>
              <td>Task comment thread content.</td>
              <td><a href="#row-ft-text-area-long-text">Text area</a></td>
              <td>No</td>
            </tr>
            <tr id="row-assigned-comments">
              <td>Assigned comments</td>
              <td>Assignable/resolvable comments.</td>
              <td><a href="#row-ft-text-area-long-text">Text area</a></td>
              <td>No</td>
            </tr>
            <tr id="row-latest-comment">
              <td>Latest comment</td>
              <td>Most recent comment (as a column).</td>
              <td><a href="#row-ft-text-area-long-text">Text area</a></td>
              <td>Yes</td>
            </tr>
            <tr id="row-created-by">
              <td>Created by</td>
              <td>Creator user.</td>
              <td><a href="#row-ft-people">People</a></td>
              <td>No</td>
            </tr>
            <tr id="row-date-created">
              <td>Date created</td>
              <td>Creation timestamp.</td>
              <td><a href="#row-ft-date">Date</a></td>
              <td>No</td>
            </tr>
            <tr id="row-date-updated">
              <td>Date updated</td>
              <td>Last-updated timestamp.</td>
              <td><a href="#row-ft-date">Date</a></td>
              <td>Yes</td>
            </tr>
            <tr id="row-date-done">
              <td>Date done</td>
              <td>Completion timestamp.</td>
              <td><a href="#row-ft-date">Date</a></td>
              <td>Yes</td>
            </tr>
            <tr id="row-date-closed">
              <td>Date closed</td>
              <td>Closed timestamp.</td>
              <td><a href="#row-ft-date">Date</a></td>
              <td>Yes</td>
            </tr>
            <tr id="row-pull-requests">
              <td>Pull Requests</td>
              <td>Linked PRs via integration.</td>
              <td><a href="#row-ft-relationships">Relationship</a></td>
              <td>Yes</td>
            </tr>
            <tr id="row-sprints">
              <td>Sprints</td>
              <td>Sprint association (if enabled).</td>
              <td><a href="#row-ft-relationships">Relationship</a></td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 id="sec-3-1-1-2">3.1.1.2 ClickUp's Inadequacy</h4>
      <p>ClickUp has one core object: a task. So no matter what you’re trying to model, every entry is forced to inherit
        the same base schema— fields like assignee, due date, priority, and workflow status.
        That’s fine when the entry <em>is</em> a work item, but it becomes a mismatch when the entry represents
        something else entirely, like a record or event. Those fields are either meaningless or create the wrong mental
        model, and while you can hide some columns in specific views, you can’t truly remove the task-shaped defaults
        across ClickUp.</p>
      <h3 id="sec-3-1-2">3.1.2 Custom Fields</h3>
      <p>These are fields you create and attach to <strong>scopes</strong>. In practice, scopes include location scopes
        (Spaces/Folders/Lists) and also non-location scopes such as Task Types. A Custom Field becomes available
        wherever its scope applies.</p>
      <h2 id="sec-3-2">3.2 Field Types</h2>
      <h3 id="sec-3-2-1">3.2.1 Field-Type Families</h3>
      <h4 id="sec-3-2-1-1">3.2.1.1 System-Only Field Types</h4>
      <p>Some field types exist only as part of ClickUp’s built-in system and aren’t available as Custom Field types you
        can create. Examples include Lists, Status, Task Type, Tags, Priority, Dependencies, and Time Estimate.</p>
      <h4 id="sec-3-2-1-2">3.2.1.2 Parameterized Field Types</h4>
      <p>Some field types aren’t “complete” until you define parameters such as an option set, a scale, a range, or a
        referenced target.
        Common parameter patterns include option sets (Dropdown, Labels), scales (Rating), ranges (Progress Manual), and
        relationship/selection configuration (Rollup).</p>
      <h4 id="sec-3-2-1-3">3.2.1.3 Computational Field Types</h4>
      <p>Some fields represent derived values rather than directly-entered values. Examples include Formula and Progress
        (Auto).</p>
      <h4 id="sec-3-2-1-4">3.2.1.4 AI Field Types</h4>
      <p>AI fields are computational fields whose values are generated or inferred using AI, typically based on task
        content plus configuration.
        Examples include Summary, Sentiment, Categorize, Custom Text, Custom Dropdown, Progress Updates, Translation,
        T-Shirt Size, and Action Items.</p>
      <h4 id="sec-3-2-1-5">3.2.1.5 Scope-Selecting Field Types</h4>
      <p>Some fields determine which scopes apply to a task (and therefore influence what else becomes relevant or
        available). There are two of these: Lists and Task Type.</p>
      <h3 id="sec-3-2-2">3.2.2 Field Types Table</h3>
      <div class="doc-table-wrap">
        <table class="doc-field-types-table">
          <thead>
            <tr>
              <th>Field type</th>
              <th>Description</th>
              <th>System-only field type</th>
              <th>Parameters</th>
              <th>Computational</th>
              <th>AI</th>
              <th>Scope Selecting</th>
            </tr>
          </thead>
          <tbody>
            <tr id="row-ft-lists">
              <td>Lists</td>
              <td>Multi-valued field of ClickUp lists</td>
              <td>Yes</td>
              <td>Set of lists, representing the leaves of the location scope hierarchy.<br />Defined per workspace.</td>
              <td>No</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
            <tr id="row-ft-status">
              <td>Status</td>
              <td>Single-choice state field representing the entry’s workflow state.</td>
              <td>Yes</td>
              <td>Set of labels.<br />Defined per location.</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-task-type">
              <td>Task Type</td>
              <td>Single-choice classification field selecting the task’s type.</td>
              <td>Yes</td>
              <td>Set of labels.<br />Defined per workspace.</td>
              <td>No</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
            <tr id="row-ft-tags">
              <td>Tags</td>
              <td>Multi-valued label field referencing tag objects used for categorization.</td>
              <td>Yes</td>
              <td>Set of labels.<br />Defined per space.</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-description">
              <td>Description</td>
              <td>Rich-text content field for task narrative/specification.</td>
              <td>Yes</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-comment">
              <td>Comment</td>
              <td>ClickUp comments</td>
              <td>Yes</td>
              <td></td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-priority">
              <td>Priority</td>
              <td>Single-choice urgency/importance field.</td>
              <td>Yes</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-duration">
              <td>Duration</td>
              <td>Duration value representing planned span between start and end (when enabled).</td>
              <td>Yes</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-dependencies">
              <td>Dependencies</td>
              <td>Relationship field expressing blocking / waiting relationships between tasks.</td>
              <td>Yes</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-time-estimate">
              <td>Time Estimate</td>
              <td>Duration value representing expected effort.</td>
              <td>Yes</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-time-tracked">
              <td>Time Tracked</td>
              <td>Duration value representing recorded effort.</td>
              <td>Yes</td>
              <td>-</td>
              <td>?</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-sprint-points">
              <td>Sprint Points</td>
              <td>Numeric estimation field (story points) for sprint planning.</td>
              <td>Yes</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-action-items">
              <td>Action Items</td>
              <td>Generates actionable follow-up items inferred from task content.</td>
              <td>No</td>
              <td>Configuration</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-button">
              <td>Button</td>
              <td>Manual trigger field used to initiate configured automation behavior from an entry.</td>
              <td>No</td>
              <td>Configuration</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-categorize">
              <td>Categorize</td>
              <td>Assigns tasks into dropdown categories using AI, optionally guided by custom instructions and task
                variables.</td>
              <td>No</td>
              <td>Configuration</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-checkbox">
              <td>Checkbox</td>
              <td>Boolean field.</td>
              <td>No</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-custom-dropdown">
              <td>Custom Dropdown</td>
              <td>Generates/assigns values for a dropdown AI Field according to a user-defined prompt and configured
                dropdown options.</td>
              <td>No</td>
              <td>Configuration</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-custom-text">
              <td>Custom Text</td>
              <td>Generates text output according to a user-defined prompt to fill a text-based AI Field.</td>
              <td>No</td>
              <td>Configuration</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-date">
              <td>Date</td>
              <td>Date/time field.</td>
              <td>No</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-dropdown">
              <td>Dropdown</td>
              <td>Single-choice categorical field with a finite option set.</td>
              <td>No</td>
              <td>Set of labels</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-email">
              <td>Email</td>
              <td>Email-address formatted string field.</td>
              <td>No</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-files">
              <td>Files</td>
              <td>Field holding file attachments (uploaded or cloud-linked).</td>
              <td>No</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-formula">
              <td>Formula</td>
              <td>Computed field defined as an expression over other fields.</td>
              <td>No</td>
              <td>Expression</td>
              <td>Yes</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-labels">
              <td>Labels</td>
              <td>Multi-valued categorical field using a defined option set.</td>
              <td>No</td>
              <td>Set of labels</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-location">
              <td>Location</td>
              <td>Address/location field (map/geocoded address representation).</td>
              <td>No</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-money">
              <td>Money</td>
              <td>Currency-typed numeric field.</td>
              <td>No</td>
              <td>Currency</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-number">
              <td>Number</td>
              <td>Numeric field.</td>
              <td>No</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-people">
              <td>People</td>
              <td>People selector field (users and optionally Teams).</td>
              <td>No</td>
              <td>Set of users.<br />Defined per workspace</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-phone">
              <td>Phone</td>
              <td>Phone-number formatted string field with country/area code support.</td>
              <td>No</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-progress-auto">
              <td>Progress (Auto)</td>
              <td>Automatically computed progress value based on completion of specified action items (e.g.,
                subtasks/checklists).</td>
              <td>No</td>
              <td>Configuration</td>
              <td>Yes</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-progress-manual">
              <td>Progress (Manual)</td>
              <td>Manually set progress value over a configured numeric range.</td>
              <td>No</td>
              <td>Min/Max</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-progress-updates">
              <td>Progress Updates</td>
              <td>Generates a synthesized progress update for tasks based on recent task activity within a selected time
                window and output format.</td>
              <td>No</td>
              <td>Configuration</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-rating">
              <td>Rating</td>
              <td>Ordinal rating field using a configured scale.</td>
              <td>No</td>
              <td>Scale</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-relationships">
              <td>Relationships</td>
              <td>Field representing links between tasks via relationship edges.</td>
              <td>No</td>
              <td>Location</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-rollup">
              <td>Rollup</td>
              <td>Field that displays selected fields from related tasks.</td>
              <td>No</td>
              <td>Relationship + Field</td>
              <td>Yes</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-sentiment">
              <td>Sentiment</td>
              <td>Classifies task sentiment as positive, neutral, or negative using task content (including description,
                Custom Fields, and comments).</td>
              <td>No</td>
              <td>Configuration</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-signature">
              <td>Signature</td>
              <td>Signature capture field (typed or drawn).</td>
              <td>No</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-summary">
              <td>Summary</td>
              <td>Generates a concise representation of task content (e.g., description, attachments, and conversations)
                as a summary in a selected format.</td>
              <td>No</td>
              <td>Configuration</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-t-shirt-size">
              <td>T-Shirt Size</td>
              <td>Estimates task size/effort using t-shirt sizing based on task data and contextual information from its
                List.</td>
              <td>No</td>
              <td>Configuration</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-text">
              <td>Text</td>
              <td>Single-line text field.</td>
              <td>No</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-text-area-long-text">
              <td>Text area / Long Text</td>
              <td>Multi-line text field with rich text support.</td>
              <td>No</td>
              <td>-</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-translation">
              <td>Translation</td>
              <td>Translates a selected task property (title or description) into a specified target language.</td>
              <td>No</td>
              <td>Configuration</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-voting">
              <td>Voting</td>
              <td>Vote-count field used for prioritization/sentiment-style scoring.</td>
              <td>No</td>
              <td>Emoji</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr id="row-ft-website">
              <td>Website</td>
              <td>URL field.</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 id="sec-3-3">3.3 Scope</h2>
      <p>These are the two scope hierarchies used in ClickUp—one that answers “which project context is this entry part
        of?”, and one that answers “what kind of entry is this meant to represent?”.</p>
      <h3 id="sec-3-3-1">3.3.1 Location Scope Hierarchy</h3>
      <p>This is the <strong>project hierarchy</strong>: the chain of project containers an entry sits inside. A space
        usually represents a broad domain (like a product area or department), folders group related sub-projects inside
        that domain, and lists are often the concrete project boards/pipelines where work is tracked day-to-day. When an
        entry belongs to a specific list, it’s automatically part of the larger project contexts above it too—so the
        entry is simultaneously in the “sub-project” scope (the list) and in the broader “project” scopes (its folder
        and space). That’s why location scopes behave like inheritance: lower-level project contexts don’t replace
        higher-level ones; they narrow them.</p>
      <div class="doc-tree">
        <ul>
          <li>🟦 General (space)<ul>
              <li>📁 Some Project (folder)<ul>
                  <li>📋 Project Tasks (list)</li>
                </ul>
              </li>
              <li>📁 Household Chores (folder)<ul>
                  <li>📋 Household Tasks (list)</li>
                  <li>📋 Family Meetings (list)</li>
                </ul>
              </li>
              <li>📋 Events (list)</li>
              <li>📋 Milestones (list)</li>
            </ul>
          </li>
          <li>🟩 Personal (space)<ul>
              <li>📁 My Projects (folder)<ul>
                  <li>📁 Birthday Planning (folder)<ul>
                      <li>📋 Locations (list)</li>
                      <li>📋 Presents (list)</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <h3 id="sec-3-3-2">3.3.2 Task Type Scope Hierarchy</h3>
      <p>This is the <strong>purpose hierarchy</strong> (even though ClickUp implements it as flat). A task type scope
        doesn’t say <em>where</em> the entry lives; it says <em>what it is</em>. It’s the semantic category of the
        entry—what kind of data it represents and what it’s intended to be used for. For example, two entries can live
        in the same project scope, but have different purposes (a bug vs. a feature request vs. a meeting note), and
        that difference is captured by task type. In ClickUp, choosing a task type selects exactly one purpose scope
        with no inheritance: it doesn’t automatically imply a more general “parent type” scope. It’s a single-purpose
        label that lets you treat entries differently based on meaning, not location.</p>
      <div class="doc-tree">
        <ul>
          <li>✅ Task</li>
          <li>📆 Event</li>
          <li>🗨️ Request</li>
          <li>🫱🏼‍🫲🏼 Meeting</li>
          <li>🏆 Goal</li>
        </ul>
      </div>