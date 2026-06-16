# World Cup Match Widget — Project Plan

A phone widget that shows each day's World Cup matches, in your own time zone, styled in your favourite team's colours — set up through a simple website.

---

## The idea in one line

A good-looking widget for your lock screen or home screen that always shows the right match info for the day, so you never have to go back to Google to check timings again.

---

## What the widget shows

A clean card with a **static World Cup image on the left** and **match information on the right**. The background colour comes from the team you support, so it feels personal at a glance.

---

## How it works for the person using it

1. They open the website.
2. They pick their **country and time zone** (the site suggests it automatically, and they can change it).
3. They pick their **favourite team** — this sets the widget's background colour.
4. They choose **what to show**: all matches, or only their team's matches.
5. The site gives them a small bit of text to copy.
6. They paste it into a free helper app and add the widget to their lock screen or home screen.
7. From then on, the widget updates itself — no further setup ever needed.

---

## The two viewing modes

Whichever mode the person picks, the widget behaves the same way: it shows the matches for a single day, on whichever screen they added it to, and **updates itself automatically every day** as match days and timings roll past. The only difference between the modes is *which* matches it filters down to:

- **All matches** — shows every match scheduled for that day.
- **Follow my team** — shows only their chosen team's matches.

That's the whole choice. The colour and time zone are personal to them; this setting just decides whether they see the full slate or just their team.

---

## How the widget updates itself

This is the part that makes it feel "alive" without anyone touching it:

- The widget always shows the **current or next set of matches**, and **rolls forward on its own** as matches finish.
- It advances by **match time, not by midnight**. This matters because many games kick off in the small hours in India — so instead of clinging to "today's date," the widget moves on to the genuinely *next* upcoming match once the current ones are done.
- On days with **no matches** (rest days between rounds), it doesn't go blank — it simply shows the next upcoming fixture, even if that's a day or more away.

**Example.** On 17 June there are two matches at 12:30 a.m. and 3:30 a.m. IST. Overnight, the widget shows those two games (and their live state once they begin). Once the 3:30 game wraps up, the widget moves on to the next upcoming match — which, given the time difference, is often around a day later — displaying it as *"Next: [match] — [date], [time]."* Then it counts down to that one, and the cycle repeats by itself.

---

## One honest detail about the timing

The widget updates itself, but **not to the exact minute**. Phones refresh widgets on their own schedule — roughly every 15 minutes to an hour, and less often when the phone has been sitting idle and locked (like overnight). So it *does* advance to the next set of matches automatically, just with a short lag rather than flipping the very instant a match ends. Think of it as a "what's on / what's next" board, not a live stopwatch. Whatever it's showing is always correctly worked out for the moment it last refreshed.

---

## A note on match timings

The tournament is hosted in the USA, Canada and Mexico, so many matches kick off **overnight in India** (roughly between 1 a.m. and 6:30 a.m.). Every time is shown in the person's own time zone, with matches flagged as "tonight" or "early tomorrow" so the schedule is easy to read at a glance.

---

## Important things to be clear about

A few honest realities shaped how this is designed:

- **A website on its own can't place a widget on a phone.** Every phone needs a small "host" app for the widget to live in. That host is tiny — nothing like a heavy app that eats storage.
- **For now, the host is a free helper app.** This is perfect for your own testing and for people comfortable with a little setup.
- **If the helper app is deleted, the widget disappears with it.** The widget can't survive on its own — the helper app has to stay installed for it to keep working.
- **The lock-screen widget is very small.** It can only show a little. The richer, better-looking design really belongs on the **home screen**, which has more room.
- **A widget can't be added with a single button.** The person always adds it themselves through their phone's normal "add widget" step — the website will guide them through it with clear instructions.

---

## Platforms

- **iPhone first** — so you can test everything yourself as you go.
- **Android next** — the same setup approach works there too.

---

## The build, step by step

1. **Get the match schedule ready** — pull together the full list of fixtures, dates, times and teams from a free, public source.
2. **Build the part that creates the personalised widget image** — the right matches for the moment, the right time zone, the chosen team colour, and the chosen mode (team or all).
3. **Build the website** — where people make their choices, see a live preview, get their copy-paste setup text, and follow simple add-the-widget instructions.
4. **Test on your own iPhone** — run the whole thing end to end and refine the look.
5. **Add Android** — document the setup for Android phones against the same system.
6. **Optional, later** — add live scores during matches, and consider a dedicated, sturdier widget app if you want to reach people who aren't comfortable with the setup steps.

---

## Roughly how long

About a week of focused work for a solid first version — and you'll be able to test it on your own phone partway through, not just at the very end.

---

## Decisions still open

- Whether to eventually publish a dedicated widget app, which would make setup far easier for non-technical people (the trade-off is that it has to go through the app stores).
- Whether the "all matches" view should cap at a few matches with a "+ more" note on the busiest days, so the card never feels overcrowded.
