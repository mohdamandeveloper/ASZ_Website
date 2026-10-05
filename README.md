# ASZ Technologies – Home (React + SCSS)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Structure
```
src/
  main.jsx                 entry (imports styles/main.scss)
  App.jsx                  page + brand tokens (accent / accent2 / orb)
  components/              Header, Hero, OrbCanvas, Clients, Services, Stats,
                           Products, Industries, Process, CallToAction, Footer
  hooks/                   useCountUp, useStepProgress, useDragSlider
  data/content.js          copy, links, logo-sprite positions, sector list
  styles/
    _variables.scss        tokens + mixins
    _base.scss             resets, shared utilities, image backgrounds
    _animations.scss       keyframes, scroll-reveal (animation-timeline)
    _header … _footer.scss one partial per section
    _responsive.scss       ≤900px rules (imported last)
    main.scss              entry that @use's everything
  assets/                  images
```
Nav / footer links still point at `About.dc.html`, `Services.dc.html`, etc.
Change them once in `src/data/content.js` (`ROUTES`) when you add real pages.
