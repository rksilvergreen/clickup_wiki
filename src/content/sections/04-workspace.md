---
title: "Workspace"
order: 4
---

<h1 id="sec-4">4. Workspace</h1>
<p>This section describes the workspace configuration and conventions.</p>
<p>(To be filled in later.)</p>
<h2 id="sec-4-1">4.1 System fields parameters</h2>
<p>Parameters and configuration for system-level fields.</p>
<h3 id="sec-4-1-1">4.1.1 Task Types</h3>
<p>This section explains all task types used in this workspace.</p>
<h4 id="sec-4-1-1-1">4.1.1.1 Task</h4>
<p>The default actionable work-item entry type: something you intend to do, track to completion, and manage
  through a workflow (states, ownership, timing, and urgency). Task is the most operational type—meant for
  execution rather than just capture—so it relies on ClickUp's built-in workflow machinery such as
  <em>Status</em>, <em>Assignment</em> and <em>Priority</em>.
</p>
<p><strong>Purpose</strong></p>
<p>A Task represents a unit of work that has an owner (or owners), a lifecycle state, and often a due horizon. You
  can plan, prioritize, and advance it while keeping context in description, comments, attachments, and
  relationships.</p>
<p><strong>Schema</strong></p>
<p>Core task-defining fields, which define why Tasks feel native in ClickUp:</p>
<div class="doc-table-wrap doc-schema-table-wrap">
  <table class="doc-schema-table">
    <thead>
      <tr>
        <th><a href="#row-status">Status</a></th>
        <th><a href="#row-priority">Priority</a></th>
        <th><a href="#row-assignees">Assignees</a></th>
        <th><a href="#row-start-date">Start date</a></th>
        <th><a href="#row-due-date">Due date</a></th>
        <th><a href="#row-time-estimate">Time estimate</a></th>
        <th><a href="#row-time-tracked">Time tracked</a></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>The lifecycle state of the task; statuses are according to the relevant <a href="#sec-4-1-2-2">status group</a>.</td>
        <td>Urgency or importance level of the task.</td>
        <td>The person(s) responsible for doing the task.</td>
        <td>The date from which work can start being done on the task (for whatever constraints apply).</td>
        <td>The date by which the task must be completed.</td>
        <td>Estimated effort or duration for the task.</td>
        <td>Actual time logged on the task.</td>
      </tr>
    </tbody>
  </table>
</div>
<h4 id="sec-4-1-1-2">4.1.1.2 Event</h4>
<p>An Event is an entry that represents something that happens at a defined period in time—it has a start and an
  end. It is about when it occurs and when the user should be made aware of it in advance.</p>
<p><strong>Purpose</strong></p>
<p>Events let you record and track occurrences (meetings, deadlines, trips, etc.) and control how far in advance
  they surface for notification or display. The workspace derives precise start and end times from the dates you
  set, drives <em>Status</em> from those times, and computes a <strong>Relevance date</strong> so the event can be
  shown or notified ahead of time.</p>
<p><strong>Schema</strong></p>
<div class="doc-table-wrap doc-schema-table-wrap">
  <table class="doc-schema-table">
    <thead>
      <tr>
        <th><a href="#row-start-date">Start date</a></th>
        <th><a href="#row-due-date">Due date</a></th>
        <th><a href="#row-start-time">Start time</a></th>
        <th><a href="#row-end-time">End time</a></th>
        <th><a href="#row-relevance-number">Relevance #</a></th>
        <th><a href="#row-relevance-unit">Relevance Unit</a></th>
        <th><a href="#row-relevance-date">Relevance Date</a></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>The date/time when the event starts (user-facing; may be date-only).</td>
        <td>The date/time when the event ends (user-facing; may be date-only).</td>
        <td>A custom field: the precise datetime when the event starts. Used internally; see below.</td>
        <td>A custom field: the precise datetime when the event ends. Used internally; see below.</td>
        <td>How many units of time in advance the event should start being shown or notified.</td>
        <td>The unit for that advance period (e.g. days, weeks, months).</td>
        <td>A computed datetime: the date on which this event should start being shown/notified to the user. Calculated as: Start time minus the relevance period (Relevance # + Relevance Unit).</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>Why Start time and End time</strong></p>
<p>ClickUp's <strong>Start date</strong> and <strong>Due date</strong> default to 4:00 AM on the given day when
  the user does not specify a time. That default is unsuitable for events. <strong>Start time</strong> and
  <strong>End time</strong> are auxiliary computational fields: the system populates them from <strong>Start
    date</strong> and <strong>Due date</strong> using consistent rules (see below). The user works only with
  <strong>Start date</strong> and <strong>Due date</strong>; <strong>Start time</strong> and <strong>End
    time</strong> are not meant to be edited directly.
</p>
<p><strong>"Has a time" vs date-only</strong></p>
<p>The system treats 4:00 AM Jerusalem time as "no time set" (ClickUp's default for date-only). Any other time is
  treated as a real time and used as-is for <strong>Start time</strong> or <strong>End time</strong>.</p>
<p><strong>When an event is created</strong></p>
<p>The system reads <strong>Start date</strong>, <strong>Due date</strong>, <strong>Relevance #</strong>, and
  <strong>Relevance Unit</strong>, and sets:
</p>
<ul>
  <li><strong>Start time</strong></li>
  <li><strong>End time</strong> </li>
  <li><strong>Status</strong></li>
  <li><strong>Relevance date</strong> (if <strong>Relevance #</strong> and <strong>Relevance Unit</strong> are
    set)</li>
</ul>
<p><em>Start date → Start time</em></p>
<ul>
  <li>If <strong>Start date</strong> has a real time, that time becomes <strong>Start time</strong>.</li>
  <li>If <strong>Start date</strong> is date-only, <strong>Start time</strong> is set to midnight of that day.
  </li>
  <li>If there is no <strong>Start date</strong> but <strong>Due date</strong> exists with no time, <strong>Start
      time</strong> is set to midnight of the due date.</li>
  <li>Otherwise <strong>Start time</strong> is left empty.</li>
</ul>
<p><em>Due date → End time</em></p>
<ul>
  <li>If <strong>Due date</strong> has a real time, that time becomes <strong>End time</strong>.</li>
  <li>If <strong>Due date</strong> is date-only, <strong>End time</strong> is set to midnight of the <em>next</em>
    day (so the event covers the whole day).</li>
  <li>If there is no <strong>Due date</strong>, <strong>End time</strong> is left empty.</li>
</ul>
<p><strong>When the start date is changed</strong></p>
<p>The system recalculates <strong>Start time</strong> (same rules as above), <strong>End time</strong> (still
  from <strong>Due date</strong>), <strong>Status</strong>, and <strong>Relevance date</strong>, then updates on
  the entry: <strong>Start time</strong>, <strong>Status</strong>, <strong>Relevance date</strong>. <strong>End
    time</strong> is not changed, because it is derived only from <strong>Due date</strong>.</p>
<p><strong>When the due date is changed</strong></p>
<p>The system recalculates <strong>Start time</strong>, <strong>End time</strong>, <strong>Status</strong>, and
  <strong>Relevance date</strong>, then updates: <strong>End time</strong> (always), <strong>Status</strong>,
  <strong>Relevance date</strong>. <strong>Start time</strong> is updated only if the entry has no <strong>Start
    date</strong> (i.e. <strong>Start time</strong> was originally derived from <strong>Due date</strong>). If the
  entry already has a <strong>Start date</strong>, <strong>Start time</strong> is left as-is.
</p>
<p><strong>When Relevance # and/or Relevance Unit is changed</strong></p>
<p>The system recalculates <strong>Relevance date</strong> (using <strong>Start time</strong> and the relevance
  period from <strong>Relevance #</strong> and <strong>Relevance Unit</strong>), then updates <strong>Relevance
    date</strong> on the entry. If <strong>Relevance #</strong> or <strong>Relevance Unit</strong> is cleared,
  <strong>Relevance date</strong> is cleared or left unset.
</p>
<h4 id="sec-4-1-1-3">4.1.1.3 Record</h4>
<p>A Record is an entry that represents something that is documented—a note, observation, or fact captured for
  reference.</p>
<p><strong>Purpose</strong></p>
<p>Records let you document items with a <strong>Timestamp</strong> so you know when they were recorded (or when
  the thing actually happened, if you backdate). There is no workflow or ownership machinery; the focus is on the
  content and the datetime.</p>
<p><strong>Schema</strong></p>
<div class="doc-table-wrap doc-schema-table-wrap">
  <table class="doc-schema-table">
    <thead>
      <tr>
        <th><a href="#row-timestamp">Timestamp</a></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>The datetime when the record was made (or, if backdated, when the documented thing occurred). When a Record is created, this field should be updated to the current time. The user can change the value afterward—for example, when recording something that happened at an earlier datetime.</td>
      </tr>
    </tbody>
  </table>
</div>
<h3 id="sec-4-1-2">4.1.2 Status groups</h3>
<p>Status Groups are a parameter of ClickUp's base-schema field <em>Status</em> that is set at the Location level
  (i.e., per list/folder/space), designed to model the lifecycle of a particular kind of entry. While a status
  group often ends up feeling like it belongs to a task type, that association is indirect: it's usually true in
  practice, but not guaranteed by ClickUp. In our workspace it becomes especially tight because every list is
  strongly coupled with a task type, so the status group chosen at the location level typically functions as the
  workflow track for that type.</p>
<p>ClickUp forces every status to live inside one of its built-in subgroups—Not started, Active, Done, Closed—even
  when the entry isn't really a "task" in the real-world sense. We still use those subgroups because we have to,
  and we try to map them as sensibly as possible—though for non-task entries it can sometimes feel a bit crooked.
  Whenever we mention a status, we annotate it with its subgroup in parentheses.</p>
<h4 id="sec-4-1-2-1">4.1.2.1 Status transitions and triggers</h4>
<p>A status change is a <strong>transition</strong>: moving an entry from one lifecycle state to another. In our
  workspace, transitions can be driven by four kinds of triggers:</p>
<ul>
  <li><span class="trigger-type">Manual</span> — The user explicitly changes the status based on judgment calls
    and intangible factors that the workspace can't reliably capture or analyze.</li>
  <li><span class="trigger-type">Internal Conditional</span> — Some change <strong>in the entry</strong> or
    <strong>elsewhere in the workspace</strong> triggers the transition.
  </li>
  <li><span class="trigger-type">External Conditional</span> — A real-world event outside the workspace happens,
    but it's still something that can be pinpointed and articulated specifically.</li>
  <li><span class="trigger-type">Chronological</span> — The passage of time triggers the change: a particular
    date-time boundary is reached.</li>
</ul>
<h4 id="sec-4-1-2-2">4.1.2.2 Task</h4>
<p>Connected to the task type <strong>Task</strong>, this status group is exclusive to that task type. It
  represents the lifecycle of an actionable work item.</p>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Backlog <span class="subgroup">(Not started)</span></strong> — The task exists, but there is no
    intent to work on it yet. it may transition to <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Do</strong> <em>if and only if</em> at least one of
    <strong>Start date</strong> or <strong>Due date</strong> is set, which acts as the signal that the task is now
    being planned.
  </li>
  <li><span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Do <span class="subgroup">(Not started)</span></strong> — The task has a <strong>Start date
      and/or Due date</strong> set, so it is now an actual candidate for execution.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>In Progress <span class="subgroup">(Active)</span></strong> — Work has begun. The move from
    <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Do</strong> to <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>In Progress</strong> is <strong>manual</strong>, representing the user
    explicitly declaring that execution started.
  </li>
  <li><span class="status-dot" style="background-color:#dc8084" title="#DC8084" aria-hidden="true"></span><strong>Canceled <span class="subgroup">(Done)</span></strong> — The task will not be completed. This can
    happen either before work started or mid-execution; the point is that it's intentionally stopped.</li>
  <li><span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span><strong>Complete <span class="subgroup">(Closed)</span></strong> — The task is finished and successfully
    completed.</li>
</ul>
<h5 id="sec-4-1-2-2-1">4.1.2.2.1 Task Transitions</h5>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Backlog → <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>To Do:</strong> <span class="trigger-type">Internal Conditional</span> — Triggered when
    <em>at least one</em> of <strong>Start date</strong> or <strong>Due date</strong> is set.
  </li>
  <li><span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Do → <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>In Progress:</strong> <span class="trigger-type">Manual</span> — The user declares that work
    has begun.</li>
  <li><strong>(<span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span>Backlog, <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>To Do, <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>In Progress) → <span class="status-dot" style="background-color:#dc8084" title="#DC8084" aria-hidden="true"></span>Canceled:</strong> <span class="trigger-type">Manual</span> — The
    user decides the task will not be completed.</li>
  <li><strong>(<span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span>Backlog, <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>To Do, <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>In Progress) → <span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span>Complete:</strong> <span class="trigger-type">Manual</span> — The
    user declares the task has been completed.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>In Progress → <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>To Do:</strong> <span class="trigger-type">Manual</span> — Work is paused, typically
    because it's blocked, deprioritized, or waiting on something, but still intended to be resumed.</li>
  <li><strong>(<span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>To Do, <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>In Progress) → <span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span>Backlog:</strong> <span class="trigger-type">Internal Conditional</span> —
    Triggered when <strong>Start date</strong> <em>and</em> <strong>Due date</strong> are reset to
    <strong>null</strong>.
  </li>
</ul>
<h4 id="sec-4-1-2-3">4.1.2.3 Event</h4>
<p>Connected to the task type <strong>Event</strong>, this status group represents the lifecycle of an event.</p>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Not Scheduled <span class="subgroup">(Not started)</span></strong> — The event exists, but
    <strong>no Start date and no Due date</strong> are set.
  </li>
  <li><span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>Upcoming <span class="subgroup">(Not started)</span></strong> — <strong>Start date and/or Due
      date</strong> is set. "Upcoming" means the event has been scheduled, and its <strong>start time has not
      arrived yet</strong>.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Occurring <span class="subgroup">(Active)</span></strong> — The current date-time is
    <strong>on/after the event's start time</strong> (i.e., the event is happening now or has started and hasn't
    ended yet).
  </li>
  <li><span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span><strong>Occurred <span class="subgroup">(Closed)</span></strong> — The current date-time is <strong>after
      the event's end time</strong> (operationally: after the <strong>Due date/time</strong>, which we treat as
    the event's end).</li>
</ul>
<h5 id="sec-4-1-2-3-1">4.1.2.3.1 Event Transitions</h5>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Not Scheduled → <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>Upcoming:</strong> <span class="trigger-type">Internal Conditional</span> — Triggered when at least one of Start date
    or Due date is set.</li>
  <li><span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>Upcoming → <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>Occurring:</strong> <span class="trigger-type">Chronological</span> — Triggered when the current datetime reaches or passes
    the event's start datetime.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Occurring → <span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span>Occurred:</strong> <span class="trigger-type">Chronological</span> — Triggered when the current datetime reaches or passes
    the event's end datetime (i.e., the due/end time).</li>
  <li><strong>(<span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>Upcoming, <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>Occurring) → <span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span>Not Scheduled:</strong> <span class="trigger-type">Internal Conditional</span> — Triggered when Start date and
    Due date are reset to null.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Occurring → <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>Upcoming:</strong> <span class="trigger-type">Internal Conditional</span> — Triggered when the event's start datetime is
    moved forward to a datetime that has not yet happened.</li>
</ul>
<h4 id="sec-4-1-2-4">4.1.2.4 Shopping</h4>
<p>Connected to the list <strong>Shopping</strong> in the space <strong>Shopping</strong>, this status group
  models the lifecycle of a purchase intent—from wishlist to receipt or abandonment.</p>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Idea <span class="subgroup">(Not started)</span></strong> — On the wishlist; we may buy it
    eventually but are not actively planning to.</li>
  <li><span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Buy <span class="subgroup">(Not started)</span></strong> — We intend to buy it soon. When making
    an online order or going to the store, this item belongs on the shopping list.</li>
  <li><span class="status-dot" style="background-color:#f76808" title="#F76808" aria-hidden="true"></span><strong>In Cart <span class="subgroup">(Active)</span></strong> — For online shopping: the product is
    selected and sitting in a site's cart, awaiting checkout.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Ordered <span class="subgroup">(Active)</span></strong> — An order has been placed; we are waiting
    for delivery.</li>
  <li><span class="status-dot" style="background-color:#dc8084" title="#DC8084" aria-hidden="true"></span><strong>Cancelled <span class="subgroup">(Done)</span></strong> — The item was in the pipeline at some point
    but will not be purchased; we have no plans to pursue it further.</li>
  <li><span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span><strong>Received <span class="subgroup">(Closed)</span></strong> — The item has been purchased and received.
  </li>
</ul>
<h5 id="sec-4-1-2-4-1">4.1.2.4.1 Shopping Transitions</h5>
<p>Every transition is <strong>manual</strong>. The usual path is <span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Idea</strong> → <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Buy</strong> → <span class="status-dot" style="background-color:#f76808" title="#F76808" aria-hidden="true"></span><strong>In Cart</strong> → <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Ordered</strong> →
    <span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span><strong>Received</strong>, but an item may move from any status to any other (e.g. <strong>Ordered</strong> back to
  <strong>To Buy</strong> after an order is cancelled, or <strong>Idea</strong> to <strong>Cancelled</strong>).
</p>
<h4 id="sec-4-1-2-5">4.1.2.5 Statusless</h4>
<p>Status is part of ClickUp's base schema and cannot be removed: every entry must have a status. For lists whose
  entries are not meaningfully characterized by a lifecycle—i.e. they have no real status—we assign this status
  group. ClickUp also requires at least one non-closed status and exactly one closed status per group, so we
  define this minimal, degenerate group with two placeholder statuses:</p>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>-- <span class="subgroup">(Not started)</span></strong> — Represents the absence of a status;
    entries that "have no status" live here.</li>
  <li><span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span><strong>--- <span class="subgroup">(Closed)</span></strong> — Required by ClickUp as the closed status for
    the group; unused in practice.</li>
</ul>
<p>All entries on a Statusless list remain in <strong>--</strong> at all times. There are no transitions; no
  status changes are ever made.</p>
<h2 id="sec-4-2">4.2 Custom fields</h2>
<p>The following fields are custom fields that belong to this workspace. They are the fields we have created and
  attached to locations or other scopes—not ClickUp's built-in system fields—and they appear in our lists and forms
  wherever their scope applies.</p>
<p>Each custom field is built from one of the <a href="#sec-3-2">field types</a> that ClickUp offers. The entries below document our workspace's specific custom fields: their names,
  types, any parameters we use, and how we use them.</p>
<div class="doc-table-wrap">
  <table class="doc-custom-fields-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Field Type</th>
        <th>Description</th>
        <th>Scopes</th>
      </tr>
    </thead>
    <tbody>
      <tr id="row-start-time">
        <td>Start Time</td>
        <td><a href="#row-ft-date">Date</a></td>
        <td>The precise date and time when an <a href="#sec-4-1-1-2">event</a> begins.</td>
        <td><a href="#sec-4-1-1-2">Event</a></td>
      </tr>
      <tr id="row-end-time">
        <td>End Time</td>
        <td><a href="#row-ft-date">Date</a></td>
        <td>The precise date and time when an <a href="#sec-4-1-1-2">event</a> ends.</td>
        <td><a href="#sec-4-1-1-2">Event</a></td>
      </tr>
      <tr id="row-relevance-number">
        <td>Relevance #</td>
        <td><a href="#row-ft-number">Number</a></td>
        <td>How many units of time define the <a href="#sec-4-1-1-2">event</a>'s relevance period.</td>
        <td><a href="#sec-4-1-1-2">Event</a></td>
      </tr>
      <tr id="row-relevance-unit">
        <td>Relevance Unit</td>
        <td><a href="#row-ft-dropdown">Dropdown</a></td>
        <td>The unit of time that defines the <a href="#sec-4-1-1-2">event</a>'s relevance period.</td>
        <td><a href="#sec-4-1-1-2">Event</a></td>
      </tr>
      <tr id="row-relevance-date">
        <td>Relevance Date</td>
        <td><a href="#row-ft-date">Date</a></td>
        <td>The date on which this <a href="#sec-4-1-1-2">event</a> should start being shown or notified to the user.</td>
        <td><a href="#sec-4-1-1-2">Event</a></td>
      </tr>
      <tr id="row-timestamp">
        <td>Timestamp</td>
        <td><a href="#row-ft-date">Date</a></td>
        <td>A single datetime, often representing when the documented occurrence happened.</td>
        <td><a href="#sec-4-1-1-3">Record</a></td>
      </tr>
    </tbody>
  </table>
</div>
