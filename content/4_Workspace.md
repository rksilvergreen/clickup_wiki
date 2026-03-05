# 4 Workspace

This section describes the workspace configuration and conventions.

(To be filled in later.)

## 4.1 System fields parameters

Parameters and configuration for system-level fields.

### 4.1.1 Task Types

This section explains all task types used in this workspace.

#### Task

The default actionable work-item entry type: something you intend to do, track to completion, and manage through a workflow (states, ownership, timing, and urgency). Task is the most operational type—meant for execution rather than just capture—so it relies on ClickUp’s built-in workflow machinery such as _Status_, _Assignment_ and _Priority_.

**Purpose**

A Task represents a unit of work that has an owner (or owners), a lifecycle state, and often a due horizon. You can plan, prioritize, and advance it while keeping context in description, comments, attachments, and relationships.

**Schema**

Core task-defining fields, which define why Tasks feel native in ClickUp:

*   **Status** — Workflow state; configured per location.
*   **Priority** — Single-choice urgency/importance.
*   **Assignees** — People selector; ownership.
*   **Start date** — Date/time.
*   **Due date** — Date/time.
*   **Time estimate** — Planned effort.
*   **Time tracked** — Recorded effort.

### 4.1.2 Status groups

Status Groups are a parameter of ClickUp's base-schema field _Status_ that is set at the Location level (i.e., per list/folder/space), designed to model the lifecycle of a particular kind of entry. While a status group often ends up feeling like it belongs to a task type, that association is indirect: it's usually true in practice, but not guaranteed by ClickUp. In our workspace it becomes especially tight because every list is strongly coupled with a task type, so the status group chosen at the location level typically functions as the workflow track for that type.

ClickUp forces every status to live inside one of its built-in subgroups—Not started, Active, Done, Closed—even when the entry isn't really a "task" in the real-world sense. We still use those subgroups because we have to, and we try to map them as sensibly as possible—though for non-task entries it can sometimes feel a bit crooked. Whenever we mention a status, we annotate it with its subgroup in parentheses.

#### 4.1.2.1 Status transitions and triggers

A status change is a **transition**: moving an entry from one lifecycle state to another. In our workspace, transitions can be driven by four kinds of triggers:
*   **Manual** — The user explicitly changes the status based on judgment calls and intangible factors that the workspace can't reliably capture or analyze.
*   **Internal Conditional** — Some change **in the entry** or **elsewhere in the workspace** triggers the transition.
*   **External Conditional** — A real-world event outside the workspace happens, but it's still something that can be pinpointed and articulated specifically.
*   **Chronological** — The passage of time triggers the change: a particular date-time boundary is reached.

#### 4.1.2.2 Task

Connected to the task type **Task**, this status group is exclusive to that task type. It represents the lifecycle of an actionable work item.
*   **Backlog (Not started)** — The task exists, but there is no intent to work on it yet. it may transition to **To Do** _if and only if_ at least one of **Start date** or **Due date** is set, which acts as the signal that the task is now being planned.
*   **To Do (Not started)** — The task has a **Start date and/or Due date** set, so it is now an actual candidate for execution.
*   **In Progress (Active)** — Work has begun. The move from **To Do** to **In Progress** is **manual**, representing the user explicitly declaring that execution started.
*   **Canceled (Done)** — The task will not be completed. This can happen either before work started or mid-execution; the point is that it's intentionally stopped.
*   **Complete (Closed)** — The task is finished and successfully completed.

##### 4.1.2.2.1 Task Transitions

*   **Backlog → To Do:** **Internal Conditional** — Triggered when _at least one_ of **Start date** or **Due date** is set.
*   **To Do → In Progress:** **Manual** — The user declares that work has begun.
*   **(Backlog, To Do, In Progress) → Canceled:** **Manual** — The user decides the task will not be completed.
*   **(Backlog, To Do, In Progress) → Complete:** **Manual** — The user declares the task has been completed.
*   **In Progress → To Do:** **Manual** — Work is paused, typically because it's blocked, deprioritized, or waiting on something, but still intended to be resumed.
*   **(To Do, In Progress) → Backlog:** **Internal Conditional** — Triggered when **Start date** _and_ **Due date** are reset to **null**.

#### 4.1.2.3 Event

Connected to the task type **Event**, this status group represents the lifecycle of an event.
*   **Not Scheduled (Not started)** — The event exists, but **no Start date and no Due date** are set.
*   **Upcoming (Not started)** — **Start date and/or Due date** is set. "Upcoming" means the event has been scheduled, and its **start time has not arrived yet**.
*   **Occurring (Active)** — The current date-time is **on/after the event's start time** (i.e., the event is happening now or has started and hasn't ended yet).
*   **Occurred (Closed)** — The current date-time is **after the event's end time** (operationally: after the **Due date/time**, which we treat as the event's end).

##### 4.1.2.3.1 Event Transitions

*   **Not Scheduled → Upcoming: Internal Conditional** — Triggered when at least one of Start date or Due date is set.
*   **Upcoming → Occurring: Chronological** — Triggered when the current datetime reaches or passes the event's start datetime.
*   **Occurring → Occurred: Chronological** — Triggered when the current datetime reaches or passes the event's end datetime (i.e., the due/end time).
*   **(Upcoming, Occurring) → Not Scheduled: Internal Conditional** — Triggered when Start date and Due date are reset to null.
*   **Occurring → Upcoming: Internal Conditional** — Triggered when the event's start datetime is moved forward to a datetime that has not yet happened.

#### 4.1.2.4 Shopping

Connected to the list **Shopping** in the space **Shopping**, this status group models the lifecycle of a purchase intent—from wishlist to receipt or abandonment.
*   **Idea (Not started)** — On the wishlist; we may buy it eventually but are not actively planning to.
*   **To Buy (Not started)** — We intend to buy it soon. When making an online order or going to the store, this item belongs on the shopping list.
*   **In Cart (Active)** — For online shopping: the product is selected and sitting in a site's cart, awaiting checkout.
*   **Ordered (Active)** — An order has been placed; we are waiting for delivery.
*   **Cancelled (Done)** — The item was in the pipeline at some point but will not be purchased; we have no plans to pursue it further.
*   **Received (Closed)** — The item has been purchased and received.

##### 4.1.2.4.1 Shopping Transitions

Every transition is **manual**. The usual path is **Idea → To Buy → In Cart → Ordered → Received**, but an item may move from any status to any other (e.g. **Ordered** back to **To Buy** after an order is cancelled, or **Idea** to **Cancelled**).

#### 4.1.2.5 Statusless

Status is part of ClickUp's base schema and cannot be removed: every entry must have a status. For lists whose entries are not meaningfully characterized by a lifecycle—i.e. they have no real status—we assign this status group. ClickUp also requires at least one non-closed status and exactly one closed status per group, so we define this minimal, degenerate group with two placeholder statuses:
*   **-- (Not started)** — Represents the absence of a status; entries that "have no status" live here.
*   **--- (Closed)** — Required by ClickUp as the closed status for the group; unused in practice.

All entries on a Statusless list remain in **--** at all times. There are no transitions; no status changes are ever made.
