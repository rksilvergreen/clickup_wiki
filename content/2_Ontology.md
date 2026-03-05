# 2 Ontology

This section defines a precise vocabulary for reasoning about databases and no-code database platforms. It formalizes core concepts, and provides a conceptual foundation for analyzing how these platforms represent data, enforce structure, and apply behavior.
## 2.1 Field
A **field** is a reusable property descriptor: it defines a named “slot” that can hold a value.
A field definition typically includes:
*   **Identity**: stable field identifier
*   **Name**: human-readable presentation
*   **Field type**: what kind of data/interaction this field represents
*   **Nullability:** whether a value must be set
*   **Default value**: what value is assumed when none is provided
*   **Scope**: under what contexts it appears
*   **Permissions**: who can view/edit

* * *
## 2.2 Field type
A **field type** is the classification that determines the field’s fundamental data shape and interaction model: what values look like, how they are edited, how they are validated, and what operations make sense.
Field types often come in several broad categories:
*   **Primitive-like types**: number, text, date/time, boolean
*   **Reference/relational types**: links to other entries, collections of references
*   **Parameterized types**: the field kind is fixed, but it requires configuration parameters to become fully defined
    *   e.g., a “choice” field whose allowed options are a parameter
    *   or a “state/status” field whose allowed states are a parameter
*   **Computed types**: values are not directly stored but derived from other stored data, relationships, or system state (often displayed like a normal field but ontologically distinct)

* * *
## 2.3 Schema
A **schema** is a specification that defines a valid **entry**. It consists of:
*   **Fields**: the set of fields that apply.
*   **Constraints**: rules that determine validity.
    *   **Unary constraint**: a restriction involving a single field (e.g., “required”).
    *   **Relational constraint**: a restriction involving two or more fields (e.g., start\_date ≤ due\_date).
*   **Operational rules**: rules that define how field values change over time in response to defined triggers. Each operational rule includes:
    *   a **trigger condition**: one of
        *   creation of a new entry under the schema
        *   a field value change
        *   passage of time
    *   a **state update**: one or more field values are changed.

* * *
## 2.4 Entry
An **entry** is a concrete instance governed by a schema. It consists of a set of values, one per field included in the schema.
The set of an entry’s field values at a given moment is its **state**.
An entry is **valid** under its schema if each value belongs to its field’s allowed domain and all schema constraints are satisfied.

* * *
## 2.5 Database
A **database** is a system that stores and operates over a collection of entries. It is organized around one or more schemas that define how entries are structured and validated.
Beyond storage, a database commonly includes behavior such as validation, transformations, computed/projection values, automation triggers, permissions, and other operational rules.

* * *
## 2.6 Scope
A **scope** is a reusable context layer that contributes a bundle of applicability for entries exposed to it. A scope can contribute:
*   **Schemas** that apply in that context
*   **Settings/policies** (permissions, presentation rules, workflow behaviors)
*   **Per-scope parameterization** of fields (where the same field kind has different parameters in different contexts)
*   **Automations** that are triggered by conditions inside the scope.
An entry’s **effective definition** is derived from the combination of all scopes it is exposed to.
### 2.6.1 Single database with scopes
In many no-code database platforms, the workspace often _looks_ like it contains many separate databases scattered across locations, sections, or modules. Conceptually, though, you can model the entire workspace as **one big** **database** of entries with a shared universe of fields—where differences in what you see and what applies are explained by scopes.

### 2.6.2 Scope exposure and scope selector fields
Entries become exposed to scopes through **scope selector fields**: fields whose values attach the entry to additional scopes.
Examples (in abstract terms):
*   A “location” selector whose value points to a container/context, thereby exposing the entry to that context scope (and possibly its parent scopes).
*   A “type” selector whose value chooses a node in a type hierarchy, exposing the entry to that type scope (and its ancestors).
So some fields are not merely data holders; they are _context-binding mechanisms_ that determine which schemas/settings/rules apply.
### 2.6.3 Scope hierarchies and inheritance
Scopes can form **hierarchies** where child scopes inherit from parents.
Inheritance means that exposure to a child implies exposure to its ancestors.
#### 2.6.3.1 Examples of possible scope hierarchies:
##### 2.6.3.1.1 Project Scope Hierarchy
How entries are grouped by the projects they support and the goals they aim to achieve.

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

##### 2.6.3.1.2 Type Scope Hierarchy
Classifies entries by what they are intended to represent, providing the semantic category that distinguishes one kind of entry from another across the workspace.

- ✅ Task
- 📆 Event
  - 👨‍👩‍👧‍👦 Family Event
    - 🎁 Birthday
  - 💻 Work Event
    - 🧮 End Of Quarter
    - 🌞 Field Day
  - 🎊 Holiday
- 🧠 Thought
- 🫱🏼‍🫲🏼 Meeting
  - 🗒️ Work Meeting
  - 🧑‍🤝‍🧑 Team Meeting

##### 2.6.3.1.3 Responsibility Scope Hierarchy
Groups entries by who is accountable for interacting with them and carrying them forward.

- 🧪 Research
  - 👩‍🦰 Alison
  - 🧔‍♂️ Dan
- 📱 Marketing
  - 👨‍👩‍👧‍👦 John's Team
    - 🧔‍♂️ John
    - 👩‍🦰 Erica
    - 👩‍🦰 Sarah
  - 👨‍👩‍👧‍👦 Rachael's Team
    - 👩‍🦰 Rachael
    - 🧔‍♂️ Tim
- 📈 Accounting
  - …
- 💻 Development
  - …
### 2.6.4 Per-scope parameterization
Some field types are **parameterized**: their full meaning requires configuration parameters. Scopes can provide those parameters at different levels.
For example:
*   a “status” field is one field kind, but the allowed state set or workflow graph can be configured per scope level
*   a “choice” field can have different option sets in different contexts
*   a templated or AI-driven field can have different prompts/specs per scope
This allows consistent field kinds while enabling contextual variation.

### 2.6.5 Scoped scope-hierarchies
Scope hierarchies do not have to be globally accessible. You can define a scope selector field inside a particular scope so that only entries already exposed to that scope can access that selector, and only then can they branch into a further scope hierarchy.
This yields nested or conditional modeling: certain context systems exist only inside certain other contexts.

#### 2.6.5.1 Examples of possible scoped scope hierarchies:
##### 2.6.5.1.1 Status Scope Hierarchy
The **Status Scope Hierarchy** is scoped under the **Task** scope of the **Type Scope Hierarchy**. That scope exposes a **status** field that acts as a scope selector into the Status hierarchy, allowing entries within the scope to branch into a more specific context that models their progression state.

- ⬜ Not Started
  - 🟫 Backlog
  - 🟨 Todo
- ⬜ Active
  - 🟪 In Progress
  - 🟧 Blocked
- ⬜ Done
  - 🟥 Canceled
  - 🟩 Completed
### 2.6.6 Entry-local scope
In addition to shared scopes, an entry may have an **entry-local scope** that applies only to itself—allowing truly per-entry schema/settings/rules extensions.