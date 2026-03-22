---
title: "Ontology"
order: 2
---

<h1 id="sec-2">2. Ontology</h1>
<p>This section defines a precise vocabulary for reasoning about databases and no-code database platforms. It
  formalizes core concepts, and provides a conceptual foundation for analyzing how these platforms represent data,
  enforce structure, and apply behavior.</p>
<h2 id="sec-2-1">2.1 Field</h2>
<p>A reusable property descriptor: it defines a named "slot" that can hold a value.
  A field definition typically includes:</p>
<ul>
  <li><strong>Identity</strong>: stable field identifier</li>
  <li><strong>Name</strong>: human-readable presentation</li>
  <li><strong>Field type</strong>: what kind of data this field represents</li>
  <li><strong>Nullability:</strong> whether a value must be set</li>
  <li><strong>Default value</strong>: what value is assumed when none is provided</li>
  <li><strong>Scope</strong>: under what contexts it appears</li>
  <li><strong>Permissions</strong>: who can view/edit</li>
</ul>
<hr />
<h2 id="sec-2-2">2.2 Field Type</h2>
<p>The classification that determines the field's fundamental data shape and
  interaction model: what values look like, how they are edited, how they are validated, and what operations make
  sense.
  Field types often come in several broad categories:</p>
<ul>
  <li><strong>Primitive-like types</strong>: number, text, date/time, boolean</li>
  <li><strong>Reference/relational types</strong>: links to other entries, collections of references</li>
  <li><strong>Parameterized types</strong>: the field kind is fixed, but it requires configuration parameters to
    become fully defined<ul>
      <li>e.g., a "choice" field whose allowed options are a parameter</li>
      <li>or a "state/status" field whose allowed states are a parameter</li>
    </ul>
  </li>
  <li><strong>Computed types</strong>: values are not directly stored but derived from other stored data,
    relationships, or system state (often displayed like a normal field but ontologically distinct)</li>
</ul>
<hr />
<h2 id="sec-2-3">2.3 Schema</h2>
<p>A <strong>schema</strong> is a specification that defines a valid <strong>entry</strong>. It consists of:</p>
<ul>
  <li><strong>Fields</strong>: the set of fields that apply.</li>
  <li><strong>Constraints</strong>: rules that determine validity.<ul>
      <li><strong>Unary constraint</strong>: a restriction involving a single field (e.g., "required").</li>
      <li><strong>Relational constraint</strong>: a restriction involving two or more fields (e.g., start_date ≤
        due_date).</li>
    </ul>
  </li>
  <li><strong>Operational rules</strong>: rules that define how field values change over time in response to
    defined triggers. Each operational rule includes:<ul>
      <li>a <strong>trigger condition</strong>: one of<ul>
          <li>creation of a new entry under the schema</li>
          <li>a field value change</li>
          <li>passage of time</li>
        </ul>
      </li>
      <li>a <strong>state update</strong>: one or more field values are changed.</li>
    </ul>
  </li>
</ul>
<hr />
<h2 id="sec-2-4">2.4 Entry</h2>
<p>An <strong>entry</strong> is a concrete instance governed by a schema. It consists of a set of values, one per
  field included in the schema.
  The set of an entry's field values at a given moment is its <strong>state</strong>.
  An entry is <strong>valid</strong> under its schema if each value belongs to its field's allowed domain and all
  schema constraints are satisfied.</p>
<hr />
<h2 id="sec-2-5">2.5 Database</h2>
<p>A <strong>database</strong> is a system that stores and operates over a collection of entries. It is organized
  around one or more schemas that define how entries are structured and validated.
  Beyond storage, a database commonly includes behavior such as validation, transformations, computed/projection
  values, automation triggers, permissions, and other operational rules.</p>
<hr />
<h2 id="sec-2-6">2.6 Scope</h2>
<p>A <strong>scope</strong> is a reusable context layer that contributes a bundle of applicability for entries
  exposed to it. A scope can contribute:</p>
<ul>
  <li><strong>Schemas</strong> that apply in that context</li>
  <li><strong>Settings/policies</strong> (permissions, presentation rules, workflow behaviors)</li>
  <li><strong>Per-scope parameterization</strong> of fields (where the same field kind has different parameters in
    different contexts)</li>
  <li><strong>Automations</strong> that are triggered by conditions inside the scope.
    An entry's <strong>effective definition</strong> is derived from the combination of all scopes it is exposed
    to.</li>
</ul>
<h3 id="sec-2-6-1">2.6.1 Single Database with Scopes</h3>
<p>In many no-code database platforms, the workspace often <em>looks</em> like it contains many separate databases
  scattered across locations, sections, or modules. Conceptually, though, you can model the entire workspace as
  <strong>one big</strong> <strong>database</strong> of entries with a shared universe of fields—where differences
  in what you see and what applies are explained by scopes.
</p>
<h3 id="sec-2-6-2">2.6.2 Scope Exposure and Scope Selector Fields</h3>
<p>Entries become exposed to scopes through <strong>scope selector fields</strong>: fields whose values attach the
  entry to additional scopes.
  Examples (in abstract terms):</p>
<ul>
  <li>A "location" selector whose value points to a container/context, thereby exposing the entry to that context
    scope (and possibly its parent scopes).</li>
  <li>A "type" selector whose value chooses a node in a type hierarchy, exposing the entry to that type scope (and
    its ancestors).
    So some fields are not merely data holders; they are <em>context-binding mechanisms</em> that determine which
    schemas/settings/rules apply.</li>
</ul>
<h3 id="sec-2-6-3">2.6.3 Scope Hierarchies and Inheritance</h3>
<p>Scopes can form <strong>hierarchies</strong> where child scopes inherit from parents.
  Inheritance means that exposure to a child implies exposure to its ancestors.
  Examples of possible scope hierarchies:</p>
<p><strong>Project Scope Hierarchy</strong> — How entries are grouped by the projects they support and the goals they aim to achieve.</p>
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
<p><strong>Type Scope Hierarchy</strong> — Classifies entries by what they are intended to represent, providing the semantic category that distinguishes
  one kind of entry from another across the workspace.</p>
<div class="doc-tree">
  <ul>
    <li>✅ Task</li>
    <li>📆 Event<ul>
        <li>👨‍👩‍👧‍👦 Family Event<ul>
            <li>🎁 Birthday</li>
          </ul>
        </li>
        <li>💻 Work Event<ul>
            <li>🧮 End Of Quarter</li>
            <li>🌞 Field Day</li>
          </ul>
        </li>
        <li>🎊 Holiday</li>
      </ul>
    </li>
    <li>🧠 Thought</li>
    <li>🫱🏼‍🫲🏼 Meeting<ul>
        <li>🗒️ Work Meeting</li>
        <li>🧑‍🤝‍🧑 Team Meeting</li>
      </ul>
    </li>
  </ul>
</div>
<p><strong>Responsibility Scope Hierarchy</strong> — Groups entries by who is accountable for interacting with them and carrying them forward.</p>
<div class="doc-tree">
  <ul>
    <li>🧪 Research<ul>
        <li>👩‍🦰 Alison</li>
        <li>🧔‍♂️ Dan</li>
      </ul>
    </li>
    <li>📱 Marketing<ul>
        <li>👨‍👩‍👧‍👦 John's Team<ul>
            <li>🧔‍♂️ John</li>
            <li>👩‍🦰 Erica</li>
            <li>👩‍🦰 Sarah</li>
          </ul>
        </li>
        <li>👨‍👩‍👧‍👦 Rachael's Team<ul>
            <li>👩‍🦰 Rachael</li>
            <li>🧔‍♂️ Tim</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>📈 Accounting<ul>
        <li>…</li>
      </ul>
    </li>
    <li>💻 Development<ul>
        <li>…</li>
      </ul>
    </li>
  </ul>
</div>
<h3 id="sec-2-6-4">2.6.4 Per-Scope Parameterization</h3>
<p>Some field types are <strong>parameterized</strong>: their full meaning requires configuration parameters.
  Scopes can provide those parameters at different levels.
  For example:</p>
<ul>
  <li>a "status" field is one field kind, but the allowed state set or workflow graph can be configured per scope
    level</li>
  <li>a "choice" field can have different option sets in different contexts</li>
  <li>a templated or AI-driven field can have different prompts/specs per scope
    This allows consistent field kinds while enabling contextual variation.</li>
</ul>
<h3 id="sec-2-6-5">2.6.5 Scoped Scope-Hierarchies</h3>
<p>Scope hierarchies do not have to be globally accessible. You can define a scope selector field inside a
  particular scope so that only entries already exposed to that scope can access that selector, and only then can
  they branch into a further scope hierarchy.
  This yields nested or conditional modeling: certain context systems exist only inside certain other contexts.</p>
<p>For example, the <strong>Status Scope Hierarchy</strong> is scoped under the <strong>Task</strong> scope of the <strong>Type
  Scope Hierarchy</strong>. That scope exposes a <strong>status</strong> field that acts as a scope selector
  into the Status hierarchy, allowing entries within the scope to branch into a more specific context that models
  their progression state:</p>
<div class="doc-tree">
  <ul>
    <li>⬜ Not Started<ul>
        <li>🟫 Backlog</li>
        <li>🟨 Todo</li>
      </ul>
    </li>
    <li>⬜ Active<ul>
        <li>🟪 In Progress</li>
        <li>🟧 Blocked</li>
      </ul>
    </li>
    <li>⬜ Done<ul>
        <li>🟥 Canceled</li>
        <li>🟩 Completed</li>
      </ul>
    </li>
  </ul>
</div>
<h3 id="sec-2-6-6">2.6.6 Entry-Local Scope</h3>
<p>In addition to shared scopes, an entry may have an <strong>entry-local scope</strong> that applies only to
  itself—allowing truly per-entry schema/settings/rules extensions.</p>
