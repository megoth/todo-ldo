describe("Frontpage spec", () => {
  it("serves some about app and Solid info if authenticated", () => {
    cy.visit("/");

    // TODO: REMOVE THIS AT SOME POINT
    // App uses a long time to load
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.waitUntil(() => cy.get("h1.title").then((element) => expect(element).to.contain("Solid Todo App")));

    cy.get("[data-testid='UnderDevelopmentHeader']").should("contain", "Under development");
  });

  it("provides options to authenticate", () => {
    cy.visit("/");

    cy.get("[data-testid='LoginButton'].length").should("not.equal", 0);
  });
});