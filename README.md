# Junior Olympiad

A local flashcard site for Euro Junior, built with HTML, CSS and JavaScript. It uses browser storage for completed decks and missed questions. There is no sign-in, and All About Me answers are spoken aloud.

## Start on Windows

Install Python 3 if needed. Open PowerShell and run:

```powershell
cd 'C:\John\junior-olympiad'
py -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ in your browser. Keep PowerShell open while using the site. Press Ctrl+C to stop the server. If your Python installation provides `python` instead of `py`, substitute that command.

## Study and practice

- Choose a subject, topic and deck. In Learn, reveal each answer and finish the deck to mark it complete. Finishing a Practice round also marks its deck complete.
- Mixed Quiz draws five questions across topics. Its score counts first attempts.
- Try Again collects missed questions across subjects. Correctly answering one in this review removes it from the queue. Progress is specific to the browser profile and site address.
- Listen uses the browser's speech synthesis. It prefers Indian or British English voices. Phonics cards use whole example words and magic-e pairs because checked isolated sound recordings are unavailable. Letter cards speak letter names. Voice availability and pronunciation depend on the device.

## Edit the syllabus

The expansion cards are in `extra-cards.js`, `extra-evs.js`, and `extra-generated.js`. The site appends them to the original deck rows in `syllabus.js`. An optional eighth field holds a replacement card row for Practice, Mixed Quiz, and Try Again. This lets an oral Learn activity have a scored question about a fictional character.

In `syllabus.js`, each subject contains topics and each topic contains decks. A card row contains the answer, illustration, prompt, optional explanation, optional spoken example, optional choices and optional ordered tiles. Use `null` for an unused field before a field you need. Reuse the existing examples for counted dots, shapes, matching and ordering. Keep existing deck titles and card positions stable when preserving saved progress matters. Append new cards to existing decks where practical.
