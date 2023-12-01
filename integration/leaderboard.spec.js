// leaderboard_spec.js
describe('Leaderboard Test', () => {
    beforeEach(() => {
      cy.visit('/team'); // url to load the leaderboard
    });
  
    it('should display the leader based on contributions and skills', () => {
      cy.fixture('teamMembers').as('teamMembersData'); // Load fixture data as an alias
  
      // Calling specific route to return the fixture data
      cy.intercept('/api/teamMembers', '@teamMembersData').as('getTeamMembers');
  
      // Wait for the data to be loaded
      cy.wait('@getTeamMembers');
  
      // Assert that the leader is displayed at the top of the list
      cy.get('.team-member:first').should('contain', 'Sanjay Verma'); // Adjust selector based on your application
  
      // Optionally, you can assert other properties or behaviors related to leadership
      cy.get('.team-member:first .leadership-badge').should('exist');
    });
  
    it('should update leader when contributions change', () => {
      cy.fixture('teamMembers').as('initialTeamMembersData'); // Load initial fixture data as an alias
  
      // Set up a custom route to return the initial fixture data
      cy.intercept('/api/teamMembers', '@initialTeamMembersData').as('getInitialTeamMembers');
  
      // Wait for the initial data to be loaded
      cy.wait('@getInitialTeamMembers');
  
      // Assuming your application has functionality to update contributions
      // For example, a button to increase contributions
      cy.get('.increase-contribution-button').click();
  
      cy.fixture('teamMembers').as('updatedTeamMembersData'); // Load updated fixture data as an alias
  
      // Set up a custom route to return the updated fixture data
      cy.intercept('/api/teamMembers', '@updatedTeamMembersData').as('getUpdatedTeamMembers');
  
      // Wait for the updated data to be loaded
      cy.wait('@getUpdatedTeamMembers');
  
      // Assert that the leader is now sanjay verma with the increased contribution
      cy.get('.team-member:first').should('contain', 'Sanjay Verma');
      cy.get('.team-member:first .contribution').should('contain', '100'); // Adjust based on the expected contribution
    });
  });
  