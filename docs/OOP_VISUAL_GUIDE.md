# 🎨 LIBRARY MANAGEMENT SYSTEM - Visual Diagrams
## For Presentation and Understanding

---

# 📊 CLASS HIERARCHY DIAGRAM

```
                    ┌─────────────────────────────────────┐
                    │      LibraryItem (Abstract)         │
                    │─────────────────────────────────────│
                    │ - itemID: int                       │
                    │ - title: string                     │
                    │ - isAvailable: bool                 │
                    │ # author: string (protected)        │
                    │ # lateFee: double (protected)       │
                    │─────────────────────────────────────│
                    │ + getItemID(): int                  │
                    │ + getTitle(): string                │
                    │ + setAvailability(bool): void       │
                    │ + displayInfo(): void = 0  ★PURE★   │
                    │ + calculateFine(int): double        │
                    │ + checkOut(): void                  │
                    │ + returnItem(): void                │
                    └─────────────────┬───────────────────┘
                                      │
                   ┌──────────────────┼──────────────────┐
                   │                  │                  │
         ┌─────────▼─────────┐  ┌────▼────────┐  ┌─────▼──────────┐
         │      Book         │  │  Magazine   │  │      DVD       │
         │───────────────────│  │─────────────│  │────────────────│
         │ - ISBN: string    │  │ - issue: int│  │ - duration: int│
         │ - pages: int      │  │ - month: str│  │ - genre: string│
         │───────────────────│  │─────────────│  │────────────────│
         │ + displayInfo()   │  │ + displayIn │  │ + displayInfo()│
         │ + calculateFine() │  │ + calculateF│  │ + calculateFine│
         │   ₹10/day         │  │   ₹3/day    │  │   ₹15/day      │
         └───────────────────┘  └─────────────┘  └────────────────┘
```

---

# 🔄 INHERITANCE FLOW

```
Base Class (Parent)
       ↓
   LibraryItem
   ├── Has: itemID, title, author, lateFee
   ├── Methods: displayInfo(), calculateFine()
   └── Abstract: Cannot instantiate
       
       ↓  ↓  ↓  (Inheritance)
       
   ┌───┴───┬───┴───┐
   │       │       │
 Book  Magazine  DVD  (Derived Classes)
   │       │       │
   ↓       ↓       ↓
  Adds    Adds    Adds
  ISBN    Issue   Duration
  Pages   Month   Genre
```

---

# 🎭 POLYMORPHISM IN ACTION

## Scenario: Calculating Late Fines

```
Code:
    LibraryItem* item;  // Base class pointer
    
    item = new Book(...);
    fine = item->calculateFine(5);     → Calls Book version → ₹50
    
    item = new Magazine(...);
    fine = item->calculateFine(5);     → Calls Magazine version → ₹15
    
    item = new DVD(...);
    fine = item->calculateFine(5);     → Calls DVD version → ₹75

SAME CODE → DIFFERENT BEHAVIOR = POLYMORPHISM!
```

## Visual Representation:

```
                     calculateFine(5)
                            │
                    ┌───────┴───────┐
                    │ Base Pointer  │
                    │ (Runtime)     │
                    └───────┬───────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
        ┌───▼───┐       ┌───▼───┐     ┌───▼────┐
        │ Book  │       │ Mag.  │     │  DVD   │
        │ ₹10/d │       │ ₹3/d  │     │ ₹15/d  │
        └───┬───┘       └───┬───┘     └───┬────┘
            │               │               │
        ₹50.00          ₹15.00          ₹75.00
```

---

# 📦 ENCAPSULATION VISUALIZATION

```
┌──────────────────────────────────────────────────────┐
│              LibraryItem Class                       │
│                                                      │
│  ┌────────────────────────────────────────┐         │
│  │         PRIVATE (Hidden)               │         │
│  │  🔒 itemID                             │         │
│  │  🔒 title                              │         │
│  │  🔒 isAvailable                        │         │
│  └────────────────────────────────────────┘         │
│             ↕ (No direct access)                    │
│  ┌────────────────────────────────────────┐         │
│  │    PUBLIC INTERFACE (Controlled)       │         │
│  │  ✓ getItemID() → returns itemID       │         │
│  │  ✓ getTitle() → returns title          │         │
│  │  ✓ setAvailability(bool) → validates   │         │
│  └────────────────────────────────────────┘         │
│                                                      │
│  Outside code MUST use public methods               │
└──────────────────────────────────────────────────────┘

❌ item.itemID = 999;           // ERROR! Private!
✅ int id = item.getItemID();   // OK! Public getter!
```

---

# 🎨 ABSTRACTION CONCEPT

```
         Abstract Class (LibraryItem)
         ┌───────────────────────────┐
         │  displayInfo() = 0        │  ← Pure Virtual
         │  (No implementation)      │     (Must implement)
         └─────────────┬─────────────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
    ┌────▼────┐   ┌────▼────┐   ┌───▼────┐
    │  Book   │   │Magazine │   │  DVD   │
    │ Implem. │   │ Implem. │   │ Implem.│
    └─────────┘   └─────────┘   └────────┘

Cannot Create:
    ❌ LibraryItem item;  // ERROR! Abstract!

Can Create:
    ✅ Book book;         // OK! Concrete class!
    ✅ LibraryItem* ptr = new Book();  // OK! Pointer!
```

---

# 🔄 SYSTEM WORKFLOW

```
1. INITIALIZATION
   ┌─────────────────────────────────────┐
   │ Create Library Items                │
   │  - 2 Books                          │
   │  - 2 Magazines                      │
   │  - 2 DVDs                           │
   │ Store in: vector<LibraryItem*>      │
   └─────────────────────────────────────┘
                    ↓
2. DISPLAY (Polymorphism)
   ┌─────────────────────────────────────┐
   │ for each item in library:           │
   │   item->displayInfo()               │
   │   (Calls appropriate version)       │
   └─────────────────────────────────────┘
                    ↓
3. BORROW ITEMS
   ┌─────────────────────────────────────┐
   │ User: Raj Kumar                     │
   │  - Borrows Book                     │
   │  - Borrows Magazine                 │
   │  - Borrows DVD                      │
   │ Status: Available → Borrowed        │
   └─────────────────────────────────────┘
                    ↓
4. RETURN WITH FINES (Polymorphism)
   ┌─────────────────────────────────────┐
   │ Return after 5 days late:           │
   │  - Book: calculateFine(5) → ₹50     │
   │  - Magazine: calculateFine(5) → ₹15 │
   │  - DVD: calculateFine(5) → ₹75      │
   │ (Different fines for each type!)    │
   └─────────────────────────────────────┘
                    ↓
5. CLEANUP
   ┌─────────────────────────────────────┐
   │ delete item                         │
   │  → Book destructor                  │
   │  → LibraryItem destructor           │
   │ (Virtual destructor ensures proper  │
   │  cleanup through base pointer)      │
   └─────────────────────────────────────┘
```

---

# 🎯 MEMORY LAYOUT

## Stack vs Heap:

```
STACK (Local Variables):
┌─────────────────────────┐
│ main() function         │
│  ├─ library (vector)    │
│  ├─ student (User)      │
│  └─ local variables     │
└─────────────────────────┘

HEAP (Dynamic Memory):
┌─────────────────────────┐
│ new Book(...)  ────┐    │
│ new Book(...)  ────┤    │  ← Pointed to by
│ new Magazine(...)──┤    │     library vector
│ new Magazine(...)──┤    │
│ new DVD(...) ──────┤    │
│ new DVD(...) ──────┘    │
└─────────────────────────┘

Cleanup:
    delete item;  // Frees heap memory
```

---

# 🔍 VIRTUAL FUNCTION TABLE (VTable)

## How Polymorphism Works Internally:

```
LibraryItem* item = new Book(...);
                     │
                     ▼
         ┌─────────────────────┐
         │   Book Object       │
         ├─────────────────────┤
         │ VTable Pointer  ────┼──┐
         │ itemID: 101         │  │
         │ title: "C++ ..."    │  │
         │ ISBN: "978..."      │  │
         └─────────────────────┘  │
                                  │
              ┌───────────────────┘
              ▼
         ┌──────────────────────────┐
         │   Book's VTable          │
         ├──────────────────────────┤
         │ displayInfo   → Book ver.│
         │ calculateFine → Book ver.│
         │ destructor    → Book ver.│
         └──────────────────────────┘

When you call: item->displayInfo()
    1. Look at item's VTable pointer
    2. Find displayInfo entry
    3. Call Book's version
    
This is RUNTIME POLYMORPHISM!
```

---

# 📈 OOP PRINCIPLES COMPARISON

```
┌─────────────────┬──────────────────────┬─────────────────────┐
│   Principle     │     What It Does     │   In Our Project    │
├─────────────────┼──────────────────────┼─────────────────────┤
│ ENCAPSULATION   │ Hides data           │ Private: itemID     │
│                 │ Controlled access    │ Public: getItemID() │
├─────────────────┼──────────────────────┼─────────────────────┤
│ INHERITANCE     │ Code reuse           │ Book extends        │
│                 │ IS-A relationship    │ LibraryItem         │
├─────────────────┼──────────────────────┼─────────────────────┤
│ POLYMORPHISM    │ Many forms           │ calculateFine()     │
│                 │ Same interface       │ Different for each  │
├─────────────────┼──────────────────────┼─────────────────────┤
│ ABSTRACTION     │ Hide complexity      │ displayInfo() = 0   │
│                 │ Define contract      │ Pure virtual        │
└─────────────────┴──────────────────────┴─────────────────────┘
```

---

# 🎬 DEMONSTRATION SEQUENCE

## Live Demo Flow:

```
1. START
   ├─ Show code structure
   └─ Explain classes

2. ENCAPSULATION
   ├─ Point to private members
   ├─ Show getters/setters
   └─ Try direct access (explain why it fails)

3. INHERITANCE
   ├─ Show base class
   ├─ Show derived classes
   └─ Explain constructor chaining

4. ABSTRACTION
   ├─ Point to pure virtual function
   ├─ Try to create LibraryItem (explain error)
   └─ Create Book instead

5. POLYMORPHISM ⭐ MAIN DEMO
   ├─ Create vector<LibraryItem*>
   ├─ Add different types
   ├─ Loop and call displayInfo()
   ├─ Calculate fines (different amounts!)
   └─ Show output

6. CLEANUP
   ├─ Delete objects
   └─ Show destructor sequence

7. SUMMARY
   └─ Recap all 4 principles
```

---

# 💡 KEY POINTS FOR PRESENTATION

## When Explaining Encapsulation:
> "Notice we cannot access itemID directly. We must use getItemID(). This is data protection - the core of encapsulation!"

## When Explaining Inheritance:
> "Book IS-A LibraryItem. It inherits all base class members and adds its own. This promotes code reuse!"

## When Explaining Polymorphism:
> "Watch this! Same function call - calculateFine(5) - but three different results: ₹50, ₹15, ₹75. That's polymorphism!"

## When Explaining Abstraction:
> "LibraryItem is abstract - you can't create it directly. It defines WHAT derived classes must do, not HOW. That's abstraction!"

---

# 🎯 CHEAT SHEET FOR Q&A

| Question | Quick Answer |
|----------|--------------|
| What is OOP? | Object-Oriented Programming - organizing code using objects with data and methods |
| Why encapsulation? | Data protection, controlled access, validation |
| Why inheritance? | Code reuse, establishing IS-A relationships |
| Virtual vs Pure Virtual? | Virtual: can override. Pure virtual: MUST override |
| Why virtual destructor? | Proper cleanup when deleting through base pointer |
| What is abstract class? | Class with at least one pure virtual function |
| Runtime vs Compile time? | Runtime: decided during execution. Compile: decided during compilation |

---

# 📊 OUTPUT ANALYSIS

## Expected Console Output Sections:

```
1. INITIALIZATION
   📚 Library initialized with 6 items

2. POLYMORPHIC DISPLAY
   ╔═══════════════════════════════════════╗
   ║            BOOK DETAILS               ║
   ╚═══════════════════════════════════════╝
   [Details displayed polymorphically]

3. BORROWING
   ✓ Item checked out successfully!
   Raj Kumar borrowed: [item name]

4. FINE CALCULATION ⭐ HIGHLIGHT THIS!
   Returning Book (5 days late):
   Late by 5 days. Fine: ₹50.00

   Returning Magazine (5 days late):
   Late by 5 days. Fine: ₹15.00

   Returning DVD (5 days late):
   Late by 5 days. Fine: ₹75.00

5. SUMMARY
   ✓ ENCAPSULATION: Private data with getters/setters
   ✓ INHERITANCE: Book, Magazine, DVD inherit
   ✓ POLYMORPHISM: Virtual functions, different behavior
   ✓ ABSTRACTION: LibraryItem is abstract

6. CLEANUP
   Book destructor called
   LibraryItem destructor called
   [Proper cleanup sequence]
```

---

**Use these diagrams during your presentation to visually explain concepts!** 🎨

**Pro Tip:** Draw these on the board while explaining for maximum impact! ✏️
