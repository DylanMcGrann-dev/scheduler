const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
   });

  it("should book an interview", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it( "should edit an interview", () => {
    cy.get("[alt=Edit]")
    .should("be.hidden")
    .invoke('show')
    .should("be.visible")
    .click();
    cy.get("[alt='Tori Malcolm']").click();
    cy.get("input")
    .type("{selectall}{backspace}")
    .type("Dylan Mcgrann");
    cy.contains("Save")
    .click()
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
    .should("be.hidden")
    .invoke('show')
    .should("be.visible")
    .click();
    cy.contains("Confirm")
    .click()
    cy.contains("deleting")
    .should("be.visible")
    cy.contains("Deleting")
    .should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});