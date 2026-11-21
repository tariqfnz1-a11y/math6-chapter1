# Chapter 1 Learning Blueprint — Factors and Multiples

**Source Authority:** *Mathematics 6 (Based on Single National Curriculum 2022)* — Punjab Curriculum and Textbook Board (PCTB), Lahore (`chapter-1-content-map.md`)  
**Target Learners:** Grade 6 Students (Ages 11–12)  
**Scope:** Domain 1 — Numbers and Operations, Sub-Domain 1: **Factors and Multiples** (Textbook pp. 1–18; Answer Key p. 182; Glossary p. 188)

---

## Part 1: Digital Textbook Experience & Editorial Design Philosophy

This application is designed as a **living, tactile Grade 6 mathematics textbook**—not an administrative LMS or analytics dashboard.

### 1.1 Aesthetic & Spatial Layout
- **Book-Spread Reading Rhythm:** Generous warm-paper margins (`#FAF8F4` / `#FFFFFF` page surface), crisp ink typography, high-contrast mathematical typesetting, and numbered section ribbons (`1.1`, `1.2`, ..., `1.8`) matching the PCTB textbook hierarchy.
- **No Dashboard Clutter:** No KPI cards, leaderboards, telemetry bars, or dense multi-panel sidebars. Navigation behaves like a clean **Chapter Contents Drawer & Page Progress Bookmark** (showing *Where You Are in Chapter 1* plus subtle completion checkmarks on sections and exercises).
- **Textbook Callout Grammar:** Recreates the familiar PCTB margin blocks with calm, distinct visual framing:
  - **Remember** (key rules & properties)
  - **Note** (critical clarifications & edge cases)
  - **Fun Fact / Interesting Information / History** (curiosity & cultural/historical context)
  - **Thinking Time / Challenge** (stretch prompts with optional revealable hints)
- **Worked Example Steppers:** Instead of overwhelming students with a wall of static steps, each textbook Worked Example lets students either **Read Full Solution** (like a printed page) or **Step Through Solution** one line at a time alongside the corresponding diagram.
- **Inline Interactive Figures:** Every diagram from the textbook (arrays, division ladders, factor trees, 1–100 Sieve grid, paper-cutting/tiling grids, multiplication square chart) lives *inside the flow of the lesson text* as Figure 1.1, Figure 1.2, etc., inviting hands-on exploration right where the concept is taught.

---

## Part 2: Chapter Opener — Sub-Domain 1: Factors and Multiples (p. 1 / PDF p. 4)

- **Chapter Title:** Sub-Domain 1 — **FACTORS AND MULTIPLES**
- **Students' Learning Outcomes (SLOs):**
  - Recognize factors of numbers up to 3-digit.
  - Multiples of numbers up to 2-digit *(extended in textbook §§1.3 & 1.5 up to 4-digit)*.
  - Find and apply HCF and LCM.
- **Opening Story Hook (Interactive Scene):**
  - *Hailey College Transit Stop:* A Metro Bus arrives every **180 seconds**, and an Orange Line Train arrives every **360 seconds**. A student asks: *"After how much time will both the bus and the train arrive together?"*
  - **Interactive Opener Widget:** A simple Play/Pause dual-track transit simulation showing the bus and train arriving at $180\text{ s}$ and $360\text{ s}$. Students make a quick prediction before diving into Section 1.1, then return with full mastery in Section 1.6.2 (LCM) to prove the answer ($360\text{ seconds} = 6\text{ minutes}$).

---

## Part 3: Section-by-Section Instructional Blueprint

---

### Section 1.1 — Factors and Multiples (1.1.1 Defining a Factor & 1.1.2 Defining a Multiple)
**Textbook Reference:** pp. 1–3 (PDF pp. 4–6)

#### 1. Learning Objectives
- Define a **factor** using both multiplication (numbers multiplied to get a product) and division (divisor leaving zero remainder).
- List all factors of 2-digit numbers systematically using factor pairs without missing or repeating any.
- Define a **multiple** as a product of a given number and another whole number, and verify multiples via exact division.
- Predict even/odd parity outcomes when adding, subtracting, multiplying, or dividing numbers.

#### 2. Concept Introduction
Start with everyday equal sharing and equal grouping: arranging **18 items** into 3 neat rows of 6 ($6 \times 3 = 18$), sharing **12 sweets** equally among friends with none left over, and stacking **boxes in packs of 5** ($1\times5, 2\times5, 3\times5, 4\times5$).

#### 3. Simple Explanation
- **1.1.1 Defining a Factor:** When you divide a number (**dividend**) by another number (**divisor**) and **nothing is left over (remainder = 0)**, that divisor is a **factor**. Every multiplication pair like $6 \times 3 = 18$ gives two factors ($6$ and $3$) of the product ($18$). To find *all* factors of a number like $36$ or $40$, start from $1 \times n$, test $2, 3, 4, \dots$ in order, and **stop when the factor pairs start repeating**.
- **1.1.2 Defining a Multiple:** When you multiply a number by $1, 2, 3, 4, \dots$ (skip-counting), the answers you get are its **multiples**. In division language ($\text{Dividend} \div \text{Divisor} = \text{Quotient}$ with remainder $0$), the **dividend** is a multiple of the **divisor** (e.g., $16$ is a multiple of $2$ because $16 \div 2 = 8$ with remainder $0$).

#### 4. Key Terms & Definitions
- **Factor:** *"Factors are the numbers which we multiply to get another number say, product or total."* / *"A factor is a number which divides the dividend completely leaving no remainder."*
- **Dividend, Divisor, Quotient, Remainder:** Related by $\text{dividend} = \text{quotient} \times \text{divisor} + \text{remainder}$.
- **Multiple:** *"A multiple is the product or total which we get when we multiply one number by another number."* / *"Multiple of a given number is the dividend, for which the given number is its factor."*

#### 5. Worked Examples (Textbook Methods)
- **Example 1 (p. 1):** Check whether (i) $3$ and (ii) $5$ are factors of $42$ using long division and $\text{dividend} = \text{quotient} \times \text{divisor} + \text{remainder}$ ($42 = 14 \times 3 + 0 \Rightarrow$ remainder $0$, so both $3$ and $14$ are factors of $42$ *(note: textbook prints "so, 14 is factor of 42"—digital note clarifies $3$ is also a factor)*; $42 = 8 \times 5 + 2 \Rightarrow$ remainder $2 \neq 0$, so $5$ is not a factor).
- **Example 2 (p. 2):** Write all factors of $36$ ($1\times36, 2\times18, 3\times12, 4\times9, 6\times6 \to 1, 2, 3, 4, 6, 9, 12, 18, 36$) and $40$ ($1\times40, 2\times20, 4\times10, 5\times8 \to 1, 2, 4, 5, 8, 10, 20, 40$).
- **Example 3 (p. 3):** Test whether (i) $42$, (ii) $52$, (iii) $70$ are multiples of $6$ via long division ($42 \div 6 = 7$ rem $0 \checkmark$; $52 \div 6 = 8$ rem $4$ $\times$; $70 \div 6 = 11$ rem $4$ $\times$).
- **Example 4 (p. 3):** List first six multiples of $7$, $9$, and $12$ using a 3-column table ($1\times n$ through $6\times n$).

#### 6. Interactive Diagram or Simulation
- **Interactive 1A — Factor Array & Remainder Splitter (Figure 1.1):** Students choose a target number (e.g., $12, 18, 36, 40, 42$) and drag a row/divisor slider. Items automatically arrange into equal rows; if remainder $= 0$, the rectangular array snaps green and logs a factor pair; if remainder $> 0$, leftover items appear outside the rectangle in amber.
- **Interactive 1B — Box-Stacking Multiple Builder (Figure 1.2):** Recreates the textbook's "boxes of 5" diagram ($1\times5$ to $6\times5$) for any chosen base number ($3, 5, 6, 7, 9, 12$). Clicking "+1 Group" stacks another row and updates the running list of multiples.

#### 7. Real-Life Applications
- Packing eggs, fruit, or biscuits into equal trays without leftovers (factors).
- Counting money in fixed-denomination bundles or buying items sold in packs of 5, 6, or 12 (multiples).

#### 8. Practical Classroom Activity
- **Textbook Activity -1 (p. 4) & Thinking Time (p. 3):**
  - *Matchstick Multiples:* Using matchsticks (or digital counters), students build groups of 3 to model $1\times3, 2\times3, 3\times3, \dots$
  - *Parity Discovery Lab:* In pairs, students test the textbook's Even/Odd tables for addition and multiplication, then investigate the two *Thinking Time* prompts: what happens with **subtraction** instead of addition, and **division** instead of multiplication (discovering why division doesn't always give a whole-number even/odd answer!).

#### 9. Home Activity
- Look around the kitchen or pantry (egg cartons, tile patterns, juice packs of 6) and list 3 objects arranged in equal rows; write the multiplication factor pair for each.

#### 10. Interesting Mathematical Facts (Textbook *Fun Facts* & *Notes*)
- All even numbers have $2$ as a factor; numbers ending in $5$ have $5$ as a factor; numbers $>0$ ending in $0$ have $2, 5,$ and $10$ as factors.
- Every number greater than $1$ has at least two factors: $1$ and itself.
- A number has **unlimited** multiples; every number is a multiple of itself; every multiple of a number is greater than or equal to the number. *(Note: Textbook Review Ex. 1 treats $0$ as a multiple of every number except itself.)*

#### 11. Common Mistakes
- **Confusing factors and multiples:** Thinking factors are larger than the number and multiples are smaller. *Fix:* Anchor "Factor = fits *inside* (divides); Multiple = *multiplied* outward."
- **Missing middle factor pairs or repeating pairs:** Stopping too early (e.g., missing $4\times9$ for $36$) or listing $9\times4$ again. *Fix:* Teach testing $1, 2, 3, \dots$ sequentially and stopping when pairs meet/repeat.
- **Assuming $0$ remainder means the *quotient* only is a factor while forgetting the *divisor*:** Highlight both divisor and quotient as a factor pair.

#### 12. Practice Questions
- **Practice -1 (p. 2):** List all factors of: (i) $84$, (ii) $120$, (iii) $230$, (iv) $352$.
- **Practice -2 (p. 3):** List first five multiples of: (i) $3$, (ii) $11$, (iii) $29$, (iv) $73$.

#### 13. Quick Knowledge Check (3 Micro-Questions)
1. Is $7$ a factor of $42$? Show the remainder when $42 \div 7$.
2. Write the 4th multiple of $12$.
3. True or False: Every factor of $36$ is less than or equal to $36$.

#### 14. Short Revision Notes
- **Factor:** Divides completely ($\text{remainder} = 0$). Finite list; always $\le$ the number.
- **Multiple:** Product of the number and $1, 2, 3, \dots$. Infinite list; always $\ge$ the number (for natural multiples).
- **Quick Divisibility Clues:** Even $\to 2$; ends in $5 \to 5$; ends in $0 \to 2, 5, 10$.

---

### Section 1.2 — Identification of Factors up to 3-Digit Numbers
**Textbook Reference:** p. 4 (PDF p. 7)

#### 1. Learning Objectives
- Test whether a given 1-digit or 2-digit number is a factor of a 2-digit or 3-digit number (e.g., $30$, $625$).
- Justify factor/non-factor conclusions clearly using zero-remainder division reasoning.

#### 2. Concept Introduction
When numbers grow into the hundreds (like $120$, $230$, $352$, or $625$), drawing dots is too slow—we need a fast, reliable **division check** plus our endings rules ($0, 2, 5$).

#### 3. Simple Explanation
To check if number $A$ is a factor of a larger 3-digit number $B$:
1. Divide $B \div A$.
2. Look at the **remainder**:
   - If remainder $= 0$, $A$ divides $B$ completely $\Rightarrow$ **$A$ is a factor of $B$**.
   - If remainder $\neq 0$, $A$ does not divide $B$ completely $\Rightarrow$ **$A$ is not a factor of $B$**.

#### 4. Key Terms & Definitions
- **Completely Divisible:** When division of a 2- or 3-digit dividend by a divisor leaves a remainder of zero ($0$).

#### 5. Worked Examples (Textbook Methods)
- **Example 5 (p. 4):** Which of (i) $5$, (ii) $7$, (iii) $3$, (iv) $11$ are factors of $30$ and why? ($5$ and $3$ divide $30$ completely with zero remainder; $7$ and $11$ do not).
- **Example 6 (p. 4):** Which of (i) $25$, (ii) $17$ are factors of $625$ and why? ($25$ is a factor of $625$ because $625 \div 25 = 25$ with zero remainder; $17$ is not because $625 \div 17$ leaves remainder $13$).

#### 6. Interactive Diagram or Simulation
- **Interactive 1.2 — 3-Digit Factor Verifier & Long-Division Checker:** Students enter or pick a 3-digit number (e.g., $625, 352, 230$) and click candidate divisors ($2, 3, 5, 7, 11, 17, 25$). An animated step-by-step division card displays the quotient, remainder badge (`R = 0` green vs `R ≠ 0` rose), and auto-generates the textbook sentence: *"___ is/is not a factor of ___ because..."*

#### 7. Real-Life Applications
- Checking if Rs. $625$ can be paid using exact Rs. $25$ notes or shared equally among $17$ students without coins left over.

#### 8. Practical Classroom Activity
- *Factor Relay:* Teacher displays a 3-digit number on the board (e.g., $230$, $352$, $625$). Small teams race to test 4 candidate divisors—two using mental ending rules ($2, 5, 10$) and two using division—and explain *why* each works or fails.

#### 9. Home Activity
- Check the page count of three books at home (if 3-digit, e.g., $192$ or $240$ pages) and test whether $2, 3, 5,$ and $10$ are factors of each book's total pages.

#### 10. Interesting Mathematical Facts
- Notice in Example 6 that $625 = 25 \times 25$: both factors in the pair are equal! Whenever a number has an equal factor pair like $25 \times 25$, it is a **square number** (foreshadowing Section 1.8).

#### 11. Common Mistakes
- **Judging by the last digit alone for all divisors:** Assuming $3$ divides $23$ or $13$ because it ends in $3$, or $7$ divides $37$. *Fix:* Emphasize that ending rules only apply to $2, 5,$ and $10$; other divisors require actual division.
- **Writing "Yes/No" without reasoning:** Textbook Examples 5 & 6 explicitly ask *"and why?"*.

#### 12. Practice Questions
- **Practice -3 (factors portion, p. 4):** Find all factors of: (i) $36$, (ii) $45$, (iii) $76$ (plus reinforcement from Practice -1: $120, 230, 352$).

#### 13. Quick Knowledge Check (3 Micro-Questions)
1. Is $15$ a factor of $225$? Explain why.
2. Is $12$ a factor of $150$? What is the remainder?
3. Without dividing, name three factors of $430$ right away.

#### 14. Short Revision Notes
- To prove $A$ is a factor of a 3-digit number $B$, show $B \div A$ leaves **remainder $0$**.
- State both the **result** and the **reason** (*"divides completely with zero remainder"*).

---

### Section 1.3 — Identification of Multiples of Numbers up to 4-Digit
**Textbook Reference:** p. 4 (PDF p. 7)

#### 1. Learning Objectives
- Determine whether a given number is a multiple of a 1-digit or 2-digit number.
- Generate multiples of 2-digit numbers by multiplying sequentially by $1, 2, 3, 4, 5, \dots$

#### 2. Concept Introduction
Suppose a staircase step or a bus ticket costs Rs. $13$, and someone hands you Rs. $39$, Rs. $45$, Rs. $65$, or Rs. $99$. Which totals could be paid in exact Rs. $13$ bills?

#### 3. Simple Explanation
Checking if $M$ is a **multiple** of $n$ is the reverse side of checking if $n$ is a **factor** of $M$:
- Either **list/generate multiples** of $n$ ($n\times1, n\times2, n\times3, \dots$) to see if $M$ appears, OR
- **Divide $M \div n$**—if there is **no remainder ($0$)**, then $M$ is a multiple of $n$.

#### 4. Key Terms & Definitions
- **Multiple Check:** Number $M$ is a multiple of $n$ if $n$ divides $M$ completely with zero remainder (equivalently, $M = n \times k$ for some counting number $k$).

#### 5. Worked Examples (Textbook Methods)
- **Example 7 (p. 4):** Identify which of (i) $39$, (ii) $45$, (iii) $65$, (iv) $99$ are multiples of $13$:
  - $39$ is a multiple of $13$ ($13 \times 3 = 39$).
  - $45$ is not a multiple of $13$ ($45 \div 13 = 3$ rem $6$).
  - $65$ is a multiple of $13$ ($13 \times 5 = 65$).
  - $99$ is not a multiple of $13$ ($99 \div 13 = 7$ rem $8$).

#### 6. Interactive Diagram or Simulation
- **Interactive 1.3 — Multiples Hop & Division Verifier:** A dual-mode number line / multiplier strip. Students pick a step size (e.g., $13$, $29$, $73$, or a 2- to 4-digit test) and jump forward $1\times, 2\times, 3\times, \dots$ to see if the jump lands directly on target numbers ($39, 45, 65, 99$, or 4-digit numbers like $1300, 1456$).

#### 7. Real-Life Applications
- Checking whether a bulk quantity (e.g., $1040$ pencils) can be packed cleanly into boxes of $13$ or $25$.

#### 8. Practical Classroom Activity
- *Multiple Bingo:* Students write six 2- or 3-digit numbers on a mini-card. The teacher calls out a base number like $13$ or $19$ (from Ex. 1.1 Q2); students cross off any number on their card that is a multiple of the called number and verify it aloud.

#### 9. Home Activity
- Check the odometer or electricity meter reading (or 4-digit numbers on car number plates) and test whether the 4-digit number is a multiple of $2$, $5$, or $10$, and test with $3$ or $13$.

#### 10. Interesting Mathematical Facts
- Look at the symmetry between Section 1.2 and Section 1.3: saying *"$65$ is a multiple of $13$"* means the exact same thing as saying *"$13$ is a factor of $65$"*!
- *(Editorial Note from Content Map)*: While the SLO highlights multiples up to 2-digit numbers, this section prepares students to test larger numbers up to 4 digits using exact division.

#### 11. Common Mistakes
- **Reversing the question:** Saying $13$ is a multiple of $39$ instead of $39$ is a multiple of $13$.
- **Stopping multiplication too soon:** Guessing $65$ is not a multiple of $13$ because $13$ isn't in standard $1$–$10$ tables up to $12\times12$—actually compute $13 \times 5 = 65$.

#### 12. Practice Questions
- **Practice -3 (multiples portion, p. 4):** Write at least 5 multiples of: (i) $36$, (ii) $45$, (iii) $76$.
- Extension: Test 4-digit candidates (e.g., Is $1365$ a multiple of $13$? Is $2450$ a multiple of $25$?).

#### 13. Quick Knowledge Check (3 Micro-Questions)
1. Which of these are multiples of $13$: $26$, $50$, $78$, $130$?
2. Write the 5th multiple of $45$.
3. If $14 \times 100 = 1400$, is $1400$ a multiple of $14$? Why?

#### 14. Short Revision Notes
- To **list** multiples: multiply the given number by $1, 2, 3, 4, 5, \dots$
- To **test** a large number as a multiple: divide by the given number and check for **remainder $0$**.

---

### Section 1.4 — Prime Numbers and Composite Numbers
**Textbook Reference:** pp. 4–7 (PDF pp. 7–10) + **Exercise 1.1** (p. 6 / PDF p. 9)

#### 1. Learning Objectives
- Define **prime numbers** ($\text{P}$) and **composite numbers** ($\text{C}$) by counting their distinct factors.
- Explain why **$1$ is neither prime nor composite**.
- Identify all prime and composite numbers up to $100$ using the **Sieve of Eratosthenes**.
- Identify special categories: even primes ($2$), odd composites, and **twin primes**.

#### 2. Concept Introduction
Try arranging $7$ footballs into neat rectangular rows with more than one ball per row—you can't! Only $1 \times 7$ works. Now try $12$ eggs: you can pack them as $1 \times 12$, $2 \times 6$, or $3 \times 4$. That geometric difference splits counting numbers bigger than $1$ into two families!

#### 3. Simple Explanation
- **Prime Number:** A natural number with **exactly two different factors**: $1$ and itself. (Set $\text{P} = \{2, 3, 5, 7, 11, \dots\}$).
- **Composite Number:** A natural number with **more than two different factors**. (Set $\text{C} = \{4, 6, 8, 9, 10, 12, \dots\}$).
- **The Special Case of $1$:** Number $1$ has only **one** factor ($1$ itself), so it has neither two factors nor more than two factors—it is **neither prime nor composite**.
- **Sieve of Eratosthenes (1–100):** Write numbers $1$ to $100$ in a grid, circle $1$ (neither), keep $2$ and cross/shade all multiples of $2$, keep $3$ and shade multiples of $3$, keep $5$ and shade multiples of $5$, keep $7$ and shade multiples of $7$. Every **unshaded** number left from $2$ to $100$ is prime!

#### 4. Key Terms & Definitions
- **Prime Number:** *"A natural number which has only two different factors, 1 and the number itself, is called prime number."* Denoted $\text{P} = \{2, 3, 5, \dots\}$.
- **Composite Number:** *"A natural number which has more than two different factors is a composite number."* Denoted $\text{C} = \{4, 6, 8, 9, \dots\}$.
- **Neither Prime Nor Composite:** $1$ (only 1 factor).
- **Twin Primes:** *"Twin primes are prime numbers that differ by 2. Such as 3 and 5."*

#### 5. Worked Examples (Textbook Methods)
- **Example 8 (p. 5):** Identify the prime number from (i) $41$, (ii) $38$, (iii) $51$:
  - $41$ is prime (only factors $1$ and $41$); $38$ has $1, 2, 19, 38$; $51$ has $1, 3, 17, 51$.
- **Example 9 (p. 5):** Identify composite numbers from (i) $29$, (ii) $39$, (iii) $56$:
  - $29$ is not composite (only two factors); $39$ ($1, 3, 13, 39$) and $56$ ($1, 2, 4, 7, 8, 14, 28, 56$) are composite.
- **Example 10 (p. 6):** Classify $65, 77, 29, 1, 19, 63, 37$ into a 3-column table (`Prime`: $19, 29, 37$; `Composite`: $63, 65, 77$; `Neither Prime Nor-Composite`: $1$).

#### 6. Interactive Diagram or Simulation
- **Interactive 1.4A — Football & Egg-Tray Shape Tester (pp. 4–5):** Students test any number $1$–$24$ to see how many distinct rectangles it can build. Only 1 rectangle $\to$ Prime badge; $>1$ rectangles $\to$ Composite badge; $1$ alone $\to$ Neutral badge.
- **Interactive 1.4B — Classification Flowchart (p. 5):** Interactive clickable tree from `Natural numbers > 1` $\to$ `Composite (>2 factors)` vs `Prime (2 factors)`.
- **Interactive 1.4C — Interactive Sieve of Eratosthenes 1–100 (p. 6):** Recreates Activity -1's $10 \times 10$ grid. Students perform each step in sequence: (1) Encircle $1$, (2) Leave $2$, shade multiples of $2$, (3) Leave $3$, shade multiples of $3$, (4) Leave $5$, shade multiples of $5$, (5) Leave $7$, shade multiples of $7$ *(corrected cleanly from textbook typo "left shaded" to "left unshaded")*. A toggle highlights all **Twin Prime pairs** on the completed board!

#### 7. Real-Life Applications
- Modern digital security and bank/internet encryption use giant prime numbers as keys because multiplying primes is easy, while splitting huge composite numbers back apart is very hard.
- Packing items: prime quantities (like 13 or 17) can't be split into equal smaller rows.

#### 8. Practical Classroom Activity
- **Textbook Teaching Point (p. 5):** *"Sit Down if Prime, Stand Up if Composite!"* Students stand an arm's length apart. Teacher calls numbers ($13, 21, 51, 101, 1$). Prime $\to$ sit down; Composite $\to$ stand up; $1$ $\to$ hands on head (neither!).

#### 9. Home Activity
- **Textbook Project -1 (p. 7):** Read a Sunday newspaper (or magazine/receipt) at home, pick 8 numbers of different digits, classify each as even, odd, prime, composite, or neither, and write all factors + 3 multiples for each.

#### 10. Interesting Mathematical Facts (Textbook *History*, *Interesting Information*, *Challenges*)
- **History (p. 6):** **Eratosthenes (276 BCE – 194 BCE)**, Greek mathematician who created the Sieve of Eratosthenes (and famously measured the Earth's circumference!).
- **Reversed-Digit Primes Challenge (p. 5):** $17$ and $71$ are both prime! Other pairs: $13$ & $31$, $37$ & $73$, $79$ & $97$.
- **Interesting Information (p. 5):** *"A composite number can be expressed as a sum of two prime numbers e.g. $3 + 5 = 8$."* *(Textbook note: while even numbers $>2$ follow Goldbach's idea, odd composites like $27$ are an interesting exception to check!)*
- **Thinking Time (p. 7):** *"Which prime number cannot be doubled from the numbers in the 1–10 group?"* (Doubling $2\to4$, $3\to6$, $5\to10$ stays within $1$–$10$, whereas doubling $7\to14$ goes outside $1$–$10$.)

#### 11. Common Mistakes
- **Thinking $1$ is prime:** Because $1$ is only divisible by $1$ and itself. *Fix:* Emphasize *"two **different** factors"*—$1$ only has one factor.
- **Thinking all odd numbers are prime:** Misclassifying $9, 15, 21, 27, 51, 57, 77, 91$ as prime! *Fix:* Teach quick checks by $3$ ($5+1=6$, $5+7=12$) and $7$ ($7\times11=77, 7\times13=91$).
- **Forgetting $2$ is prime (the ONLY even prime):** Assuming even always means composite.

#### 12. Practice Questions
- **Practice -4 (p. 6):** List all twin primes between $1$ and $100$: $(3,5), (5,7), (11,13), (17,19), (29,31), (41,43), (59,61), (71,73)$.
- **Exercise - 1.1 (p. 6):**
  - Q1: Write all factors of $30, 41, 65, 78, 105, 118, 165, 220$.
  - Q2: First five multiples of $7, 13, 19, 43, 59$.
  - Q3: All prime numbers between $30$ and $65$.
  - Q4: All even prime numbers between $50$ and $100$ (None).
  - Q5: All even prime natural and whole numbers ($2$).
  - Q6: All odd composite numbers between $50$ and $100$.
  - Q7: All neither prime nor composite natural and whole numbers *(Textbook answer key gives $1$; digital feedback also acknowledges $0$ for whole numbers)*.

#### 13. Quick Knowledge Check (3 Micro-Questions)
1. Why is $51$ a composite number even though it is odd?
2. Which is the only even prime number?
3. Sort into Prime, Composite, or Neither: $1, 2, 19, 63, 77$.

#### 14. Short Revision Notes
- **Prime ($\text{P}$):** Exactly 2 different factors ($1$ and itself). $2$ is the smallest and only even prime.
- **Composite ($\text{C}$):** More than 2 different factors. Smallest composite is $4$.
- **$1$:** Neither prime nor composite.
- **Sieve Tip:** Checking multiples of $2, 3, 5, 7$ finds every prime up to $100$.

---

### Section 1.5 — Prime Factors of up to 4-Digit Numbers and How to Express Them in Index Notation
**Textbook Reference:** pp. 7–9 (PDF pp. 10–12) + **Exercise 1.2** (pp. 8–9 / PDF pp. 11–12)

#### 1. Learning Objectives
- Distinguish between general **factorization** (e.g., $18 = 3\times6$) and **prime factorization** ($18 = 2\times3\times3$).
- Find prime factors of up to 4-digit numbers using both the **Division Method** and the **Factor Tree Method**.
- Express prime factorizations cleanly in **index notation** (identifying **base** and **index/exponent**) and expand index notation back to **expanded form**.

#### 2. Concept Introduction
Every composite number is built out of prime "building blocks," just like a word is built from letters or a molecule from atoms! Writing $36$ as $2 \times 2 \times 3 \times 3$ reveals its exact prime recipe—and $2^2 \times 3^2$ writes that recipe in tidy shorthand.

#### 3. Simple Explanation
- **Prime Factorization:** Keep breaking a composite number down until every piece is a **prime number**.
  - **Division Method (Ladder):** Divide by the smallest prime ($2, 3, 5, 7, \dots$) that works evenly, write the quotient below, and repeat until you reach $1$.
  - **Factor Tree Method:** Split the number into two factors; circle any prime branch, and keep splitting composite (square) branches until all ends are prime circles.
- **Index Notation:** Instead of writing $2 \times 2 \times 3 \times 3 \times 3$ (expanded form), count how many times each prime repeats and write it as a power (index): $2^2 \times 3^3$. In $2^5$, **$2$ is the base** and **$5$ is the index** (power/exponent).

#### 4. Key Terms & Definitions
- **Factorization:** *"The process of writing a given number into its factors is known as factorization."*
- **Prime Factors:** Prime numbers whose product equals a given composite number.
- **Prime Factorization:** *"The process of factorizing a number into its prime factors is known as prime factorization."*
- **Index Notation:** *"The representation of prime factors in the exponential form is called index notation."*
- **Base & Index (Power/Exponent):** In $2^5$, $2$ is the base (factor being multiplied) and $5$ is the index (how many times it is used).
- **Expanded Form:** Full product of prime factors (e.g., $2 \times 2 \times 3 \times 3 \times 3$).

#### 5. Worked Examples (Textbook Methods)
- **Example 11 (p. 7):** Find prime factorization of $36$ using both:
  - *Division Method:* $36 \div 2 = 18$, $18 \div 2 = 9$, $9 \div 3 = 3$, $3 \div 3 = 1 \Rightarrow 36 = 2\times2\times3\times3$.
  - *Factor Tree Method:* $36 \to 2\times18$, $18 \to 2\times9$, $9 \to 3\times3$ (distinguishing square composite nodes from circular prime leaf nodes).
- **Example 12 (p. 8):** Find prime factorization of $108$ using Division Method ($108 = 2\times2\times3\times3\times3$) and express in index notation ($2^2 \times 3^3$).

#### 6. Interactive Diagram or Simulation
- **Interactive 1.5A — Dual-View Prime Factorizer (Division Ladder + Factor Tree Sync, p. 7):** Students pick a number (e.g., $36, 108, 180, 540, 2600$) and either step through dividing by primes on the ladder or split nodes on a tree. Composite nodes appear as **squares**; prime nodes turn into **circles** automatically!
- **Interactive 1.5B — Factor Tree Puzzle Builder (Ex. 1.2 Q1):** Interactive fill-in-the-blank trees for $20, 105,$ and $180$ with instant validation.
- **Interactive 1.5C — Expanded Form $\leftrightarrow$ Index Notation Toggle (p. 8):** Hovering/tapping $2^5$ highlights **Base** vs **Index**, and clicking "Compress to Index Notation" animates identical prime factors snapping together into $2^2 \times 3^3$.

#### 7. Real-Life Applications
- Breaking large quantities into standard prime-sized packaging tiers or simplifying fractions and ratios in later Grade 6–7 chapters.

#### 8. Practical Classroom Activity
- *Two-Method Proof (Ex. 1.2 Q5):* Half the class factorizes $2,600$ using the Division Method while the other half uses different Factor Trees (e.g., $26\times100$ vs $2\times1300$), then compare at the board to see that both arrive at $2^3 \times 5^2 \times 13$.

#### 9. Home Activity
- **Textbook Project -2 (p. 9):** *"Search a 2-digit number where the square of the sum of its digits is equal to the number obtained when its digits are reversed."* (Hint: Try $18$: $(1+8)^2 = 9^2 = 81$, which is $18$ reversed!) Also factorize your birth year (4-digit number) into prime factors at home!

#### 10. Interesting Mathematical Facts
- **Fundamental Idea (*Remember*, p. 7):** *"Any composite number can be written as a product of all of its prime factors"*—and no matter which factor tree path you pick, the final prime recipe is always the same!
- **Powers of 10 (p. 8):** $100 = 10^2$, $1000 = 10^3$, $10000 = 10^4$.
- **Challenge (p. 8):** *"I am the product of two different prime factors. One of my factors is raised to the $2^{\text{nd}}$ power. My value is between $62$ and $82$. Who am I?"* (Accepts valid solutions: $3^2\times7=63$, $2^2\times17=68$, $5^2\times3=75$, $2^2\times19=76$.)
- **Go Online Reference (p. 7):** `mathplayground.com/factortrees.html`.

#### 11. Common Mistakes
- **Confusing $2^3$ with $2 \times 3 = 6$:** Thinking the index multiplies the base instead of telling *how many times* to multiply the base ($2\times2\times2 = 8$).
- **Stopping with a composite factor left inside:** Writing $36 = 2 \times 2 \times 9$ and forgetting to split $9$ into $3 \times 3$.
- **Adding prime factors instead of multiplying:** Writing $2^2 + 3^3$ instead of $2^2 \times 3^3$.
- **Dividing by a composite number in the Division Method:** Only **prime** divisors ($2, 3, 5, 7, 11, \dots$) should appear on the left of the division ladder.

#### 12. Practice Questions
- **Practice -5 (p. 7):** Find prime factors of: (i) $30$, (ii) $210$, (iii) $633$, (iv) $310$.
- **Practice -6 (p. 8):** Prime factors in index notation: (i) $96$, (ii) $192$, (iii) $576$, (iv) $4,032$.
- **Exercise - 1.2 (pp. 8–9):**
  - Q1: Complete factor trees for $20, 105, 180$.
  - Q2: Convert 4 expanded forms to index notation *(verified mathematically against textbook typos in p. 182 key)*.
  - Q3: Division method + index notation (10 numbers, $32$ to $6075$).
  - Q4: Factor tree method + index notation (10 numbers, $64$ to $7875$).
  - Q5: Prove prime factors of $2,600$ are identical by both methods.
  - Q6–Q7: Number riddles ($182$; and Q7 prime-product reasoning).
  - Q8: Expand 4 index-notation expressions.

#### 13. Quick Knowledge Check (3 Micro-Questions)
1. In $5^4$, which number is the **base** and which is the **index**?
2. Write $3 \times 3 \times 3 \times 5 \times 5$ in index notation.
3. Complete the prime factorization of $90$ using only prime numbers.

#### 14. Short Revision Notes
- **Division Method:** Divide down by primes until quotient is $1$.
- **Factor Tree:** Branch until every tip is a circled prime.
- **Index Notation:** Count repeats of each prime factor as its exponent ($\text{base}^{\text{index}}$).
- **Textbook Note (p. 8):** Use one clear method unless a specific method is requested.

---

### Section 1.6.1 — H.C.F (Highest Common Factor)
**Textbook Reference:** pp. 9–12 (PDF pp. 12–15) + **Exercise 1.3** (p. 12 / PDF p. 15)

#### 1. Learning Objectives
- Define **H.C.F** (also known as **G.C.F** or **G.C.D**) and **co-prime numbers**.
- Find the H.C.F of two or three numbers up to 3-digit using:
  1. Listing common factors (conceptual bridge)
  2. **Prime Factorization Method**
  3. **Long Division Method**
- Solve real-life partitioning, tiling, cutting, and equal-grouping word problems using H.C.F.

#### 2. Concept Introduction
Alisha has a blue sheet of paper measuring **$70\text{ cm}$ by $50\text{ cm}$** and wants to cover it completely with identical square boxes—using the **largest possible square** with zero leftover scraps. What side length works evenly into both $70$ and $50$?

#### 3. Simple Explanation
- **What H.C.F Means:** Find all numbers that divide every given number evenly (**common factors**), then pick the **greatest** one. The H.C.F is always **smaller than or equal to the smallest number** in the set.
- **Method 1 — Prime Factorization Method:** Find the prime factors of each number, circle the prime factors that appear in **all** of the given numbers, and multiply those common prime factors together.
- **Method 2 — Long Division Method (ideal for larger 3-digit numbers):**
  1. Divide the larger number by the smaller number.
  2. Use the **remainder** as the new divisor, and the **previous divisor** as the new dividend.
  3. Repeat until the remainder becomes **$0$**. The **last divisor** is the H.C.F!
  4. For **three numbers**, first find the H.C.F of two numbers, then find the H.C.F of that result and the third number.

#### 4. Key Terms & Definitions
- **H.C.F (Highest Common Factor):** *"H.C.F of two or more numbers is a greatest or highest number which divides all the given numbers."* / *"The common factor of given numbers which is the greatest of all common factors."*
- **Alternate Names:** **G.C.F** (Greatest Common Factor) and **G.C.D** (Greatest Common Divisor).
- **Co-prime Numbers:** *"If the H.C.F of two or more numbers is $1$, then the numbers are called co-prime."*

#### 5. Worked Examples (Textbook Methods)
- **Example 13 (p. 10):** Alisha's $70\text{ cm} \times 50\text{ cm}$ paper $\to$ Factors of $70$ ($1,2,5,7,10,14,35,70$) and $50$ ($1,2,5,10,25,50$) $\to$ Common ($1,2,5,10$) $\to$ H.C.F $= 10\text{ cm}$.
- **Example 14 (p. 10):** H.C.F of $27, 54,$ and $315$ by Prime Factorization: $27=3\times3\times3$, $54=2\times3\times3\times3$, $315=3\times3\times5\times7$ *(clarifying textbook's print typo on label)* $\to$ Common primes $3\times3 = 9$.
- **Example 15 (p. 11):** $45$ orange sweets and $110$ mango sweets divided into equal unmixed plates $\to$ $45=3\times3\times5$, $110=2\times5\times11 \to \text{H.C.F} = 5$ sweets per plate.
- **Example 16 (p. 11):** Cut $108\text{ m}$ and $144\text{ m}$ wires into longest equal pieces using Long Division ($144\div108 \to \text{rem } 36$; $108\div36 \to \text{rem } 0$) $\to 36\text{ m}$.
- **Example 17 (p. 11):** H.C.F of $65, 91,$ and $117$ by Long Division: Step-I $\text{HCF}(91, 117)=13$; Step-II $\text{HCF}(13, 65)=13$.

#### 6. Interactive Diagram or Simulation
- **Interactive 1.6.1A — Alisha's Paper-Cutting Grid ($70\text{ cm} \times 50\text{ cm}$, p. 10):** Students test square tile sizes ($2\text{ cm}, 5\text{ cm}, 10\text{ cm}, 15\text{ cm}$). Non-factors show red overhang/gaps; $10\text{ cm}$ fills all $7\times5=35$ tiles cleanly as the *largest* perfect fit.
- **Interactive 1.6.1B — Common Prime Matcher (p. 10):** Displays prime factor strips side-by-side; students click matching columns across *all* rows to compute H.C.F.
- **Interactive 1.6.1C — Long Division Chain Workbench (p. 11):** Step-by-step animated division cascade where each remainder visibly slides into the next divisor slot until `Remainder = 0` highlights the winning H.C.F.

#### 7. Real-Life Applications
- Paving a rectangular room floor ($10\text{ m } 15\text{ cm} \times 8\text{ m } 80\text{ cm}$) with the largest whole square tiles without cutting tiles.
- Cutting ropes/wires of different lengths into maximum equal pieces with no waste.
- Distributing books or sweets into equal packages without mixing types.

#### 8. Practical Classroom Activity
- **Textbook Activity -2 (p. 12):** Students form groups of 3, each writing their 3-digit pocket money (or favorite 3-digit number) on paper, then working together to find the H.C.F of those three 3-digit numbers using the Long Division Method.

#### 9. Home Activity
- Measure the length and width of a tabletop, book cover, or bedroom tile in centimeters (whole numbers) and find the largest square sticker size (H.C.F) that could tile it evenly.

#### 10. Interesting Mathematical Facts
- **Remember (p. 9):** The H.C.F is **always smaller than or equal to the smallest number** in the set.
- **Prime Pair Rule (Ex. 1.3 Q3):** The H.C.F of *any* two distinct prime numbers is always $1$—which makes every pair of prime numbers **co-prime**!

#### 11. Common Mistakes
- **Multiplying ALL prime factors instead of ONLY common ones:** Mixing up HCF with LCM. *Fix:* "H.C.F = **only** factors shared by **every** number."
- **In Long Division, taking the *quotient* instead of the *last divisor*:** Highlight the divisor when remainder hits $0$.
- **Forgetting to convert mixed units before computing H.C.F:** e.g., in Ex. 1.3 Q7 ($10\text{ m } 15\text{ cm}$ and $8\text{ m } 80\text{ cm}$), students must convert to $1015\text{ cm}$ and $880\text{ cm}$ first.

#### 12. Practice Questions
- **Practice -7 (p. 12):** Greatest length of measuring tape to measure $160\text{ m}, 280\text{ m}, 200\text{ m}$ ($40\text{ m}$).
- **Exercise - 1.3 (p. 12):**
  - Q1 (Prime Factorization): 6 sets of 2 and 3 numbers.
  - Q2 (Long Division): 6 sets *(noting Q2(iv) is mislabeled (vi) in textbook)*.
  - Q3–Q4: Conceptual reasoning (HCF of two primes; can HCF of $8$ and $64$ exceed $8$?).
  - Q5–Q7: Word problems (books $16, 28, 30 \to 2$; student rows $50, 70, 80 \to 10$; room tiles $1015\text{ cm}, 880\text{ cm} \to 5\text{ cm}$).

#### 13. Quick Knowledge Check (3 Micro-Questions)
1. Find the H.C.F of $18$ and $28$.
2. If the H.C.F of $15$ and $28$ is $1$, what special name do we give these two numbers?
3. What is the H.C.F of any two prime numbers?

#### 14. Short Revision Notes
- **H.C.F** divides *all* given numbers ($\text{H.C.F} \le \text{smallest number}$).
- **Prime Factorization:** Multiply **common** prime factors only.
- **Long Division:** Repeat $\text{divisor} \div \text{remainder}$ until remainder $= 0$; last divisor wins.
- Word problem clue words: *greatest, largest, maximum equal length/size*.

---

### Section 1.6.2 — L.C.M (Least Common Multiple)
**Textbook Reference:** pp. 12–15 (PDF pp. 15–18) + **Exercise 1.4** (pp. 14–15 / PDF pp. 17–18)

#### 1. Learning Objectives
- Define **L.C.M** as the smallest number divisible by all given numbers.
- Find the L.C.M of two or more numbers up to 3-digit using:
  1. Listing common multiples
  2. **Prime Factorization Method** (product of common and non-common prime factors)
  3. **Division Method** (horizontal joint division ladder)
- Solve real-life cycle, meeting-point, and smallest-divisible-number problems (including our Chapter Opener Metro Bus & Orange Train problem!).

#### 2. Concept Introduction
Nuzat cuts plastic rectangles that are **$15\text{ cm}$ long and $10\text{ cm}$ wide** and places copies side-by-side and top-to-bottom to build a **perfect square**. What is the smallest square side length she can make? And remember the Metro Bus ($180\text{ s}$) and Orange Train ($360\text{ s}$) from Page 1—now we have the exact tool to solve it!

#### 3. Simple Explanation
- **What L.C.M Means:** List the multiples of each number and find the **smallest multiple that appears in every list**.
- **Method 1 — Prime Factorization Method:** Find prime factors of each number. Identify **common prime factors** (for 3+ numbers, a factor counts as common if shared by **two or more** numbers!) and **non-common prime factors**, then multiply:
  $$\text{L.C.M} = \text{Product of common prime factors} \times \text{Product of non-common prime factors}$$
- **Method 2 — Division Method (6-Step Textbook Procedure):**
  1. Write the numbers horizontally separated by commas.
  2. Divide by the smallest prime that divides *at least one* of the numbers.
  3. Write quotients below; **bring down** any number that is not divisible as-is.
  4. Repeat until all numbers in the bottom row are co-prime (or $1, 1, 1$).
  5. Multiply all prime divisors (and any remaining co-prime numbers in the last row).

#### 4. Key Terms & Definitions
- **L.C.M (Least Common Multiple):** *"L.C.M of two or more numbers is a least number which is divisible by all the given numbers."* / *"The smallest of all their common multiples."*
- **Common vs. Non-Common Prime Factors:** Used in the Prime Factorization LCM formula.

#### 5. Worked Examples (Textbook Methods)
- **Example 18 (p. 13):** Nuzat's $15\text{ cm} \times 10\text{ cm}$ rectangles $\to$ Multiples of $10$ ($10, 20, \mathbf{30}, \dots, \mathbf{60}, \dots$) and $15$ ($15, \mathbf{30}, 45, \mathbf{60}, \dots$) $\to$ Smallest common multiple $= 30\text{ cm}$.
- **Example 19 (p. 13):** L.C.M of $54$ and $144$ by Prime Factorization: $54 = 2\times3\times3\times3$, $144 = 2\times2\times2\times2\times3\times3 \to \text{Common } (2\times3\times3 = 18) \times \text{Non-common } (2\times2\times2\times3 = 24) = 432$.
- **Example 20 (p. 14):** Minahil's secret number divisible by $16, 24,$ and $36$ using Joint Division Method: dividing horizontally by $2, 2, 2, 2, 3, 3$ down to $1, 1, 1 \Rightarrow \text{L.C.M} = 144$.

#### 6. Interactive Diagram or Simulation
- **Interactive 1.6.2A — Nuzat's Rectangle-to-Square Builder ($15\text{ cm} \times 10\text{ cm}$, p. 13):** Students click "+Add Column ($15\text{ cm}$)" and "+Add Row ($10\text{ cm}$)" to tile rectangles. Live dimensions (`Width` vs `Height`) flash green when $30\text{ cm} \times 30\text{ cm}$ ($2 \times 3 = 6$ rectangles) forms the first true square!
- **Interactive 1.6.2B — Joint Division Ladder Animator (p. 14):** Students pick the smallest prime divisor at each row; numbers divisible shrink to their quotient, while non-divisible numbers visibly "drop straight down" into the next row until `1, 1, 1` is reached.
- **Interactive 1.6.2C — Transit & Traffic Light Synchronizer (p. 1 Opener & Ex. 1.4 Q4/Q6):** Visual timeline where Metro Bus ($180\text{ s}$) & Orange Train ($360\text{ s}$)—or the 4 GPO Chowk traffic lights ($30\text{ s}, 60\text{ s}, 90\text{ s}, 120\text{ s}$)—pulse along parallel tracks until they align at the L.C.M!

#### 7. Real-Life Applications
- Bus, train, and traffic light schedules syncing at regular intervals.
- Finding the smallest package/quantity when combining items sold in different pack sizes.
- Aligning stride distances (frog $25\text{ cm}$ vs grasshopper $15\text{ cm}$).

#### 8. Practical Classroom Activity
- *Human Claps Sync:* Split the class into two or three groups. Group A claps every 2 beats, Group B every 3 beats, Group C every 4 beats while counting $1, 2, 3, \dots$ aloud. Observe which beat numbers all groups clap together ($12, 24, \dots \to \text{LCM} = 12$)!

#### 9. Home Activity
- Check two household rhythms (e.g., an alarm/timer or two family chores done every $3$ days and every $4$ days) and use L.C.M to find when they next happen on the same day.

#### 10. Interesting Mathematical Facts (Textbook *Remember*, *Thinking Time*, *Challenge*)
- **Two Shortcut Rules (p. 13):**
  1. If one number is a factor of the other, the **L.C.M is the greater number** (immediately solving our p. 1 Metro Bus $180\text{ s}$ & Orange Train $360\text{ s}$ problem: $180$ is a factor of $360$, so $\text{L.C.M} = 360\text{ s}$!).
  2. If the given numbers are **prime numbers**, the **L.C.M is their product**.
- **Challenge (p. 13):** Rida packs $64$ mangoes and $56$ oranges into equal boxes. Nosheen says 7 per box; Noureen says 8 per box. *Critical thinking check:* even though it's placed in the L.C.M section, equal-size splitting is actually an **H.C.F** problem! $\text{HCF}(64, 56) = 8$, so **Noureen is correct**.
- **Thinking Time (p. 14):** *"What is the smallest 4-digit number divisible by $21, 56,$ and $63$?"* ($\text{LCM} = 504$; next multiple $504 \times 2 = 1008$).

#### 11. Common Mistakes
- **Using H.C.F when L.C.M is needed (and vice versa):** Confusing *"smallest number divisible by..."* (L.C.M) with *"largest number that divides..."* (H.C.F).
- **Counting a shared prime twice in Prime Factorization:** Writing $2\times2$ when $2$ is common to both numbers. *Fix:* Group common primes once, then multiply remaining non-common primes.
- **Dropping numbers wrongly in the Joint Division Method:** Leaving out an undivided number instead of bringing it straight down to the next row.

#### 12. Practice Questions
- **Practice -8 (p. 14):** Waqas planting $7, 9,$ and $15$ trees per row $\to$ least total trees ($315$).
- **Exercise - 1.4 (pp. 14–15):**
  - Q1 (Prime Factorization): 6 sets.
  - Q2 (Division Method): 5 sets.
  - Q3–Q7: Frog & grasshopper ($75\text{ cm}$); UET bus & train ($2520\text{ s} = 42\text{ min}$); Q5 smallest divisible by $29, 58, 116$ *(verified answer $116$, correcting p. 182 key `3364`)*; Q6 GPO Chowk traffic lights at 9 a.m. *(verified answer $9:06\text{ a.m.}$, correcting p. 182 key `09:00 pm`)*; Q7 smallest 3-digit divisible by $16, 24, 30$ ($240$).

#### 13. Quick Knowledge Check (3 Micro-Questions)
1. Without doing a full ladder, what is the L.C.M of $5$ and $11$? Why?
2. What is the L.C.M of $12$ and $36$? Why?
3. Find the L.C.M of $14$ and $63$ using the Division Method.

#### 14. Short Revision Notes
- **L.C.M** is divisible *by* all given numbers ($\text{L.C.M} \ge \text{largest number}$).
- **Prime Factorization:** $\text{Common primes} \times \text{Non-common primes}$ (for 3+ numbers, common to 2 or more counts as common).
- **Joint Division Method:** Divide by smallest prime; bring down undivided numbers; multiply all divisors.
- Word problem clue words: *least, smallest, next time together, meet again*.

---

### Section 1.7 — Relationship Between HCF and LCM
**Textbook Reference:** pp. 15–16 (PDF pp. 18–19) + **Exercise 1.5** (p. 16 / PDF p. 19)

#### 1. Learning Objectives
- Verify experimentally that for any **two** numbers, $\text{H.C.F.} \times \text{L.C.M.} = \text{First number} \times \text{Second number}$.
- Calculate a missing number, L.C.M, or H.C.F using the rearranged formula:
  $$\text{L.C.M.} = \frac{\text{First number} \times \text{Second number}}{\text{H.C.F.}} \quad \text{and} \quad \text{Second number} = \frac{\text{H.C.F.} \times \text{L.C.M.}}{\text{First number}}$$

#### 2. Concept Introduction
When we factorized two numbers in Sections 1.6.1 and 1.6.2, H.C.F took the **overlapping** prime factors, and L.C.M took the **overlap plus the leftovers**. Put both together, and you get *every* prime factor of both original numbers!

#### 3. Simple Explanation
For any **two** whole numbers $a$ and $b$:
- Multiply their H.C.F by their L.C.M.
- Multiply the two numbers $a \times b$ together.
- Both products are **always equal**!
- Because they are equal, if you know any **three** of the four values ($\text{H.C.F}$, $\text{L.C.M}$, First number, Second number), you can find the fourth by dividing.

#### 4. Key Terms & Definitions
- **HCF–LCM Product Law:** $\text{H.C.F.} \times \text{L.C.M.} = \text{First number} \times \text{Second number}$.

#### 5. Worked Examples (Textbook Methods)
- **Example 21 (p. 15):** Verify relationship for $12$ and $21$: $\text{H.C.F} = 3$, $\text{L.C.M} = 84$; $\text{H.C.F}\times\text{L.C.M} = 3\times84 = 252$, and $12\times21 = 252$. Both match!
- **Example 22 (p. 15):** Verify relationship for $32$ and $48$ via prime factors ($32=2^5$, $48=2^4\times3$): $\text{L.C.M}=96$, $\text{H.C.F}=16$; $96\times16 = 1536 = 32\times48$.

#### 6. Interactive Diagram or Simulation
- **Interactive 1.7 — Prime-Factor Balance Scale:** Left pan holds `First Number × Second Number` (broken into prime factor tiles); right pan holds `H.C.F × L.C.M` (overlapping tiles + remaining tiles). Students watch the exact same prime factor tiles redistribute across both pans so the scale balances at equality! Includes a "Find the Missing Number" solver bar.

#### 7. Real-Life Applications
- Quick verification check: after computing both H.C.F and L.C.M of two prices, lengths, or schedules, multiply them to catch arithmetic mistakes immediately.

#### 8. Practical Classroom Activity
- **Textbook Activity -4 [first] (p. 16):** Students check the printed prices of their **Science** and **Mathematics** textbooks, find the H.C.F and L.C.M of the two prices, and verify $\text{HCF}\times\text{LCM} = \text{Price}_1 \times \text{Price}_2$.

#### 9. Home Activity
- Pick any two 2-digit house numbers or grocery item prices at home, compute their H.C.F and L.C.M, and prove that $\text{HCF}\times\text{LCM}$ equals their product.

#### 10. Interesting Mathematical Facts
- **Important Boundary:** This golden rule works for **two** numbers! (For three numbers, $\text{HCF}\times\text{LCM}$ does not generally equal $a\times b\times c$.)
- **Textbook Challenge Note (p. 16):** Textbook prints *"H.C.F = 10, L.C.M = 399, one number = 190"*. In the digital textbook, we can include an insightful **Math Detective Note**: *H.C.F must always divide L.C.M evenly—since $10$ does not divide $399$, a real pair of numbers cannot actually have $\text{HCF}=10$ and $\text{LCM}=399$ (though applying the formula gives $10\times399\div190 = 21$).*

#### 11. Common Mistakes
- **Applying the formula to 3 numbers:** Trying $\text{HCF}\times\text{LCM} = a\times b\times c$.
- **Dividing in the wrong order:** Computing $\frac{\text{One number}}{\text{HCF}\times\text{LCM}}$ instead of $\frac{\text{HCF}\times\text{LCM}}{\text{One number}}$.

#### 12. Practice Questions
- **Exercise - 1.5 (p. 16):**
  - Q1: Verify relationship for: (i) $10, 25$, (ii) $8, 28$, (iii) $34, 68$, (iv) $35, 77$, (v) $110, 230$, (vi) $160, 380$.
  - Q2: Verify for $680$ and $584$.
  - Q3: $\text{HCF}=36, \text{LCM}=1260$, one number $=72 \to$ other $= 630$.
  - Q4: $\text{HCF}=48, \text{LCM}=1440$, one number $=240 \to$ other $= 288$.

#### 13. Quick Knowledge Check (3 Micro-Questions)
1. If two numbers have $\text{H.C.F} = 4$ and $\text{L.C.M} = 48$, what is the product of the two numbers?
2. If the product of two numbers is $250$ and their $\text{H.C.F}$ is $5$, what is their $\text{L.C.M}$?
3. True or False: $\text{H.C.F} \times \text{L.C.M} = a \times b$ works for any two counting numbers.

#### 14. Short Revision Notes
- $\text{H.C.F} \times \text{L.C.M} = \text{First number} \times \text{Second number}$
- $\text{Missing number} = \dfrac{\text{H.C.F} \times \text{L.C.M}}{\text{Given number}}$
- Always sanity-check: $\text{H.C.F}$ must divide $\text{L.C.M}$ evenly!

---

### Section 1.8 — Square of Numbers up to 2-Digit Numbers
**Textbook Reference:** pp. 16–17 (PDF pp. 19–20) + **Exercise 1.6** (p. 17 / PDF p. 20) & **Activity -5** (p. 18 / PDF p. 21)

#### 1. Learning Objectives
- Define **square numbers** geometrically using full square arrays ($1, 4, 9, 16, \dots$).
- Explain why numbers like $8$, $10$, or a hollow frame of $12$ apples are *not* square numbers.
- Calculate the square of positive and negative integers up to 2-digit numbers (e.g., $(-3)^2 = 9$, $7^2 = 49$, $93^2 = 8649$).
- Recognize square numbers on a $10 \times 10$ multiplication chart and match index expressions ($4^2, 15^2$) with their square values ($16, 225$).

#### 2. Concept Introduction
Look at $1$ apple, $4$ apples ($2\times2$), $9$ apples ($3\times3$), and $16$ apples ($4\times4$). Each group forms a **filled square** with the same number of rows and columns! Can you do that with $8$ apples, $10$ apples, or $12$ apples arranged only along the border?

#### 3. Simple Explanation
- **Square Number:** A number you get when you multiply a number (or integer) **by itself** ($n \times n = n^2$). Geometrically, that many objects can fill a solid square grid.
- **Full vs. Hollow Rule:** A border of $12$ apples looks square-shaped on the outside, but the middle is empty—so $12$ is **not** a square number!
- **Squaring Positive and Negative Integers:** Multiply the integer by itself:
  - $7 \times 7 = 7^2 = 49$
  - $(-3) \times (-3) = (-3)^2 = +9$ (negative $\times$ negative $=$ positive, so the square of a non-zero integer is always positive!).

#### 4. Key Terms & Definitions
- **Square Number:** *"Numbers or number of objects that can be arranged into a square array are known as square numbers."*
- **Square of a Number ($n^2$):** Multiplying a number by itself ($n \times n$).

#### 5. Worked Examples (Textbook Methods)
- **Example 23 (p. 16):** Find the square number of the integers $-3$ and $7$:
  - $(-3) \times (-3) = (-3)^2 = 9$
  - $7 \times 7 = 7^2 = 49$
  - Where $9$ and $49$ are square numbers.

#### 6. Interactive Diagram or Simulation
- **Interactive 1.8A — Apple Square Array Sandbox (p. 16):** Students choose an apple count ($1, 4, 8, 9, 10, 12, 16, 25$) and test arranging them into an $n \times n$ grid. Includes an interactive toggle comparing the **solid $4\times4=16$** grid with the **hollow 12-apple trap** from the textbook *Note*.
- **Interactive 1.8B — Multiplication Chart Square Painter (Activity -4, p. 16):** Interactive $10\times10$ multiplication table where students click every square number in red, discovering they form the exact **main diagonal** ($1, 4, 9, 16, 25, 36, 49, 64, 81, 100$)!
- **Interactive 1.8C — Square Block Color-Matcher (Activity -5, p. 18):** Interactive 20-tile board pairing index squares ($4^2, 3^2, 5^2, 7^2, 8^2, 9^2, 10^2, 12^2, 13^2, 15^2$) with their numerical values ($16, 9, 25, 49, 64, 81, 100, 144, 169, 225$).

#### 7. Real-Life Applications
- Measuring square floor tiles, chessboard squares ($8 \times 8 = 64$), garden beds, and square photo frames.

#### 8. Practical Classroom Activity
- **Textbook Activity -4 & Activity -5 (pp. 16, 18):** Students shade the square numbers on a $10\times10$ multiplication chart, then race in pairs to color-match the 10 square pairs in Activity -5.

#### 9. Home Activity
- **Textbook Project -3 (p. 17):** Write the ages of all family members on paper, identify whose age is a square number (e.g., $4, 9, 16, 25, 36, 49, 64$), and calculate the square of everyone's age.

#### 10. Interesting Mathematical Facts
- Look at the differences between consecutive square numbers: $1 \xrightarrow{+3} 4 \xrightarrow{+5} 9 \xrightarrow{+7} 16 \xrightarrow{+9} 25$—they grow by consecutive odd numbers!
- Both $7^2$ and $(-7)^2$ equal $+49$.

#### 11. Common Mistakes
- **Multiplying by $2$ instead of multiplying by itself:** Writing $13^2 = 13 \times 2 = 26$ instead of $13 \times 13 = 169$.
- **Keeping a negative sign after squaring:** Writing $(-8)^2 = -64$ instead of $(-8)\times(-8) = +64$.
- **Counting hollow square borders as square numbers:** Clarified directly by the textbook's 12-apple *Note*.

#### 12. Practice Questions
- **Exercise - 1.6 (p. 17):**
  - Q1: Identify square numbers from: $18, 25, 17, 17, 17, 144, 79, 169, 68, 121$ *(Note: textbook repeats `17` three times in (iii)–(v) while p. 182 key marks (v) as square; digital version will transparently flag the print duplicate or provide clean verification for $25, 144, 169, 121$)*.
  - Q2: Calculate squares of: $13, -8, 23, 17, -31, 43, -3, 57, -71, 93$.

#### 13. Quick Knowledge Check (3 Micro-Questions)
1. Why is $12$ NOT a square number, even if you put 12 apples along the sides of a square?
2. What is $(-8)^2$?
3. Which numbers on a $10 \times 10$ multiplication table are square numbers?

#### 14. Short Revision Notes
- **Square Number:** Result of multiplying a number by itself ($n \times n = n^2$).
- **Geometry Check:** Must form a **completely filled** square array.
- **Sign Rule:** $(-n)^2 = (-n)\times(-n) = +n^2$ (always positive for non-zero integers).

---

## Part 4: Chapter-Wide Mind Map

Designed as an interactive, zoomable concept map at the end of the digital chapter—clicking any branch jumps directly to that textbook section or opens a mini-example card.

```
                         [ FACTORS & MULTIPLES ]
                         (Sub-Domain 1, pp. 1–18)
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
  1. FACTORS (§1.1–1.2)      2. MULTIPLES (§1.1, 1.3)    3. SPECIAL NUMBERS (§1.4, 1.8)
  • Divide with rem = 0      • Multiply by 1, 2, 3, ...  • Prime (P): 2 factors (1, self)
  • Finite list (≤ number)   • Infinite list (≥ number)  • Composite (C): >2 factors
  • Pairs stop at repeat     • Check by division (rem=0) • Neither: 1 (and 0 in W)
  • Clues: 2, 5, 10          • Even/Odd operation rules  • Sieve of Eratosthenes (1–100)
        │                           │                    • Twin Primes (differ by 2)
        │                           │                    • Square Numbers (n × n = n²)
        ▼                           │
  4. PRIME FACTORIZATION (§1.5)     │
  • Division Ladder Method          │
  • Factor Tree Method              │
  • Index Notation (Base^Index)     │
        │                           │
        └─────────────┬─────────────┘
                      ▼
       5. HCF & LCM + RELATIONSHIP (§1.6–1.7)
       ├── H.C.F / G.C.F / G.C.D (§1.6.1)
       │     • Greatest common divisor (≤ smallest)
       │     • Methods: Prime Factorization (common only) & Long Division
       │     • Co-prime if H.C.F = 1
       ├── L.C.M (§1.6.2)
       │     • Smallest common multiple (≥ largest)
       │     • Methods: Prime Factorization (common × non-common) & Joint Division
       └── Golden Link (§1.7)
             • H.C.F × L.C.M = First number × Second number (for 2 numbers)
```

---

## Part 5: Chapter 1 Glossary (Grade 6 Student Edition)

| Term | Textbook / Student-Friendly Definition | Example / Symbol |
| :--- | :--- | :--- |
| **Factor** | A number which divides a dividend completely, leaving zero ($0$) remainder; or a number multiplied by another to get a product. | Factors of $12$: $1, 2, 3, 4, 6, 12$ |
| **Multiple** | The product obtained when a given number is multiplied by $1, 2, 3, \dots$; a dividend for which the given number is a factor. | Multiples of $5$: $5, 10, 15, 20, \dots$ |
| **Even Number** | A number which is a multiple of $2$ (its ones-place digit is a multiple of $2$: $0, 2, 4, 6, 8$). | $2, 14, 36, 100$ |
| **Odd Number** | A number whose ones-place digit is not a multiple of $2$. | $1, 13, 45, 79$ |
| **Natural Numbers** | Counting numbers starting from $1$. | $\text{N} = \{1, 2, 3, \dots\}$ |
| **Prime Number** | A natural number that has only **two different factors**: $1$ and the number itself. | $\text{P} = \{2, 3, 5, 7, 11, \dots\}$ |
| **Composite Number** | A natural number that has **more than two different factors**. | $\text{C} = \{4, 6, 8, 9, 10, \dots\}$ |
| **Twin Primes** | Two prime numbers that differ by $2$. | $3$ and $5$; $11$ and $13$ |
| **Sieve of Eratosthenes** | A step-by-step grid method (shading multiples of $2, 3, 5, 7$) to find all prime numbers from $1$ to $100$. | Leaves 25 primes in $1$–$100$ |
| **Factorization** | The process of writing a given number as a product of its factors. | $18 = 3 \times 6$ |
| **Prime Factorization** | The process of breaking a number down into a product of its prime factors (using Division Method or Factor Tree Method). | $36 = 2 \times 2 \times 3 \times 3$ |
| **Index Notation** | Representing repeated prime factors in exponential form using a **base** and an **index** (exponent/power). | $108 = 2^2 \times 3^3$ |
| **Base & Index** | In $2^5$, $2$ is the **base** (factor multiplied) and $5$ is the **index** (how many times it is multiplied). | $2^5 = 2\times2\times2\times2\times2$ |
| **H.C.F (G.C.F / G.C.D)** | Highest Common Factor: the greatest number that divides all given numbers completely. | $\text{H.C.F}(12, 21) = 3$ |
| **Co-prime Numbers** | Two or more numbers whose H.C.F is $1$. | $8$ and $15$ ($\text{HCF}=1$) |
| **L.C.M** | Least Common Multiple: the smallest number that is completely divisible by all given numbers. | $\text{L.C.M}(12, 21) = 84$ |
| **Square Number** | A number (or object count) that can be arranged into a completely filled square array; obtained by multiplying an integer by itself. | $1, 4, 9, 16, 25, \dots$ |

---

## Part 6: Chapter Summary (Adapted from Textbook p. 18 / PDF p. 21)

- A **factor** is a number which divides the dividend completely leaving no remainder ($0$).
- A **multiple** of a given number is the dividend for which the given number is its factor (found by multiplying by $1, 2, 3, \dots$).
- A **prime number** ($\text{P}$) is a natural number having only two different factors: $1$ and the number itself.
- A **composite number** ($\text{C}$) is a natural number having more than two different factors. ($1$ is neither prime nor composite.)
- **Prime factorization** is the process of factorizing a number into its prime factors, which can be written compactly in **index notation** ($\text{base}^{\text{index}}$).
- **H.C.F** of two or more numbers is the highest number which divides all the given numbers.
- **L.C.M** of two or more numbers is the least number which is divisible by all the given numbers.
- For any two numbers, $\text{H.C.F.} \times \text{L.C.M.} = \text{First number} \times \text{Second number}$.
- **Square numbers** can fill a complete $n \times n$ square array and are calculated by $n \times n = n^2$ (positive for both positive and negative non-zero integers).

---

## Part 7: Final Assessment (Review Exercise 1 & Cognitive Blueprint)

Aligned with **Review Exercise 1 (pp. 17–18)** and the textbook's **Teaching Point Assessment Blueprint (p. 18)**:
- **Cognitive Weighting:** **40% Knowing** (definitions, recall, properties) · **40% Applying** (prime factorization, HCF/LCM, squares, word problems) · **20% Reasoning** (justifying why, solving reverse/missing-value and multi-constraint problems).
- **Go Online Practice Links (p. 18):** References `transum.org/.../HCF_LCM.asp` (Level 1 & Level 2) as optional enrichment.

### Section A — Conceptual Multiple Choice (Knowing — 40%)
Based directly on **Review Exercise 1, Q1 (i)–(x)** (with clear handling of textbook answer-key anomalies):
1. A number which divides the dividend completely is called: *(a. factors)*
2. Zero ($0$) is a multiple of every number except: *(c. itself — textbook convention)*
3. Any given number is even if the digit in its ones place is a multiple of: *(b. $2$)*
4. Any given number is an odd number if the digit in its ones place is not a multiple of: *(b. $2$)*
5. *(Textbook note)* Per p. 5 & p. 17: *"A composite number can always be expressed as a ___ of two primes"* *(c. sum — noting mathematically this applies to even composites $>2$)*
6. A number neither prime nor composite is: *(a. $1$)*
7. The product of **prime** factors of a given number is always equal to: *(c. given number — clarified from textbook's omitted word "prime" in Q1(vii))*
8. In $5^4$: *(d. $5$ is base and $4$ is power — matching textbook §1.5 p. 8)*
9. A number which divides all the given numbers is called: *(a. H.C.F)*
10. A number which is divisible by all the given numbers is called: *(b. L.C.M)*

### Section B — Short Definitions & Visual Matching (Knowing / Applying)
- **Review Exercise 1, Q2 (i)–(viii):** Student-interactive definition & example cards for: *Factors, Multiples, Prime numbers, Composite numbers, Index notation, Prime factorization, H.C.F, L.C.M*.
- **Square Match Check (Activity -5):** Interactive matching of 5 square expressions (e.g., $4^2, 8^2, 12^2, 13^2, 15^2$) to values ($16, 64, 144, 169, 225$).

### Section C — Computational & Applied Word Problems (Applying & Reasoning — 60%)
1. **Prime Factorization & Index Notation:** Express $540$ in index notation using the Division Method; complete a factor tree for $180$.
2. **HCF vs. LCM Method Application:**
   - Find $\text{H.C.F}$ of $65, 91, 117$ (Long Division) and $\text{L.C.M}$ of $16, 24, 36$ (Division Method).
   - *Missing Number (HCF–LCM Law):* $\text{H.C.F} = 36$, $\text{L.C.M} = 1260$, one number $= 72$. Find the other number ($630$).
   - *Integer Squares:* Calculate $(-31)^2$ and $43^2$.
3. **Review Exercise 1 Word Problems (Q3–Q6):**
   - **Q3 (Equal Rows — HCF):** Grade VI ($60$), VII ($84$), VIII ($108$) admission test participants arranged in equal rows $\to$ $12$ participants per row.
   - **Q4 (Taxi Sync — LCM):** Taxis A ($20\text{ min}$), B ($30\text{ min}$), C ($40\text{ min}$) meet at $10:30\text{ a.m.}$ $\to$ next meet at $12:30\text{ p.m.}$ ($120\text{ min}$ later).
   - **Q5 (Remainder +3 — LCM Reasoning):** Number divided by $24, 36, 60$ leaving remainder $3$ in each case $\to \text{LCM}(24,36,60) + 3 = 360 + 3 = 363$.
   - **Q6 (Bells Tolling — LCM):** Bells toll every $10, 20, 30\text{ min}$ at $12:00\text{ noon}$ $\to$ next toll together at $1:00\text{ p.m.}$ ($60\text{ min}$ later).
4. **Reasoning Stretch (20% Domain):**
   - Explain why $51$ is composite while $41$ is prime.
   - Revisit the **Chapter Opener Problem** (Metro Bus $180\text{ s}$ & Orange Train $360\text{ s}$) and explain in one sentence *which shortcut rule* gives the answer without needing a full ladder!
