describe('test burger constructor', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
        cy.intercept('POST', '/api/auth/login', { fixture: 'login.json' }).as('login');
        cy.intercept('GET', '/api/auth/user', { fixture: 'user-failed.json' }).as('user');
        cy.intercept('POST', '/api/auth/token', { fixture: 'token.json' }).as('token');
        cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('order');
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000');
    })

    it('should open constructor page by default', function() {
        cy.wait('@ingredients').then(() => {
            cy.contains('Соберите бургер');
        });
    });

    it('should active buns tab by default', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="tab-list"]').contains('Булки').parent().should('have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            cy.get('[data-testid="tab-list"]').contains('Соусы').parent().should('not.have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            cy.get('[data-testid="tab-list"]').contains('Начинки').parent().should('not.have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
        });
    });

    it('should active sauces tab if clicked on', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="tab-list"]').contains('Соусы').click();
            cy.get('[data-testid="tab-list"]').contains('Булки').parent().should('not.have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            cy.get('[data-testid="tab-list"]').contains('Соусы').parent().should('have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            cy.get('[data-testid="tab-list"]').contains('Начинки').parent().should('not.have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
        });
    });

    it('should active toppings tab if clicked on', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="tab-list"]').contains('Начинки').click();
            cy.get('[data-testid="tab-list"]').contains('Булки').parent().should('not.have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            cy.get('[data-testid="tab-list"]').contains('Соусы').parent().should('not.have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            cy.get('[data-testid="tab-list"]').contains('Начинки').parent().should('have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
        });
    });

    it('should active buns tab if clicked on', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="tab-list"]').contains('Начинки').click();
            cy.get('[data-testid="tab-list"]').contains('Булки').parent().should('not.have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            cy.get('[data-testid="tab-list"]').contains('Соусы').parent().should('not.have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            cy.get('[data-testid="tab-list"]').contains('Начинки').parent().should('have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            
            cy.get('[data-testid="tab-list"]').contains('Булки').click();
            cy.get('[data-testid="tab-list"]').contains('Булки').parent().should('have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            cy.get('[data-testid="tab-list"]').contains('Соусы').parent().should('not.have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
            cy.get('[data-testid="tab-list"]').contains('Начинки').parent().should('not.have.css', 'box-shadow', 'rgb(76, 76, 255) 0px -2px 0px 0px inset');
        });
    });

    it('should scroll to sauces if clicked on', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="tab-list"]').contains('Соусы').click();
            cy.get('[data-testid="sauces"]').then(
                souses => (
                    cy.get('[data-testid="tab-panel"]').then(
                        tabPanel => souses[0].offsetTop - tabPanel[0].offsetTop
                    ).then(
                        offset => cy.get('[data-testid="tab-panel"]').invoke('scrollTop').should('equal', offset)
                    )
                )
            );
        });
    });

    it('should scroll to toppings if clicked on', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="tab-list"]').contains('Начинки').click();
            cy.get('[data-testid="toppings"]').then(
                souses => (
                    cy.get('[data-testid="tab-panel"]').then(
                        tabPanel => souses[0].offsetTop - tabPanel[0].offsetTop
                    ).then(
                        offset => cy.get('[data-testid="tab-panel"]').invoke('scrollTop').should('equal', offset)
                    )
                )
            );
        });
    });

    it('should scroll to buns if clicked on', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="tab-list"]').contains('Начинки').click();
            cy.get('[data-testid="toppings"]').then(
                souses => (
                    cy.get('[data-testid="tab-panel"]').then(
                        tabPanel => souses[0].offsetTop - tabPanel[0].offsetTop
                    ).then(
                        offset => cy.get('[data-testid="tab-panel"]').invoke('scrollTop').should('equal', offset)
                    )
                )
            );

            cy.get('[data-testid="tab-list"]').contains('Булки').click();
            cy.get('[data-testid="buns"]').then(
                souses => (
                    cy.get('[data-testid="tab-panel"]').then(
                        tabPanel => souses[0].offsetTop - tabPanel[0].offsetTop
                    ).then(
                        offset => cy.get('[data-testid="tab-panel"]').invoke('scrollTop').should('equal', offset)
                    )
                )
            );
        });
    });

    it('should open modal popup when click on first ingredient', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="ingredient"]').first().click();
            cy.get('[data-testid="ingredient-details-name"]').should('have.text', 'Краторная булка N-200i');
        });
    });

    it('should close ingredient modal if click on close button', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="ingredient"]').first().click();
            cy.get('[data-testid="ingredient-details-name"]').should('have.text', 'Краторная булка N-200i');

            cy.get('[data-testid="close-modal"]').click();
            cy.get('[data-testid="ingredient-details-name"]').should('not.exist');
        });
    });

    it('should open modal popup when click on second ingredient', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="ingredient"]').eq(1).click();
            cy.get('[data-testid="ingredient-details-name"]').should('have.text', 'Флюоресцентная булка R2-D3');
        });
    });

    it('should close ingredient modal if click of modal overlay', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="ingredient"]').eq(1).click();
            cy.get('[data-testid="ingredient-details-name"]').should('have.text', 'Флюоресцентная булка R2-D3');

            cy.get('[data-testid="modal-overlay"]').click({force: true});
            cy.get('[data-testid="ingredient-details-name"]').should('not.exist');
        });
    });

    it('should open modal popup when click on third ingredient', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="ingredient"]').eq(2).click();
            cy.get('[data-testid="ingredient-details-name"]').should('have.text', 'Соус Spicy-X');
        });
    });

    it('should close ingredient modal if press escape', function() {
        cy.wait('@ingredients').then(() => {
            cy.get('[data-testid="ingredient"]').eq(2).click();
            cy.get('[data-testid="ingredient-details-name"]').should('have.text', 'Соус Spicy-X');

            cy.get('[data-testid="modal"]').trigger('keydown', { key: 'Escape'});
            cy.get('[data-testid="ingredient-details-name"]').should('not.exist');
        });
    });

    it('should drag bun and drop to target', function() {
        cy.wait('@ingredients').then(() => {
            const dataTransfer = new DataTransfer();

            cy.get('[data-testid="buns"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-bun"]').first().trigger('drop', { dataTransfer });

            cy.get('[data-testid="buns"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-bun"]').first().find('.constructor-element__text').should('have.text', `${el.text()} (верх)`);
                cy.get('[data-testid="target-bun"]').last().find('.constructor-element__text').should('have.text', `${el.text()} (низ)`);
            });
        });
    });

    it('should replace bun in target', function() {
        cy.wait('@ingredients').then(() => {
            const dataTransfer = new DataTransfer();

            cy.get('[data-testid="buns"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-bun"]').first().trigger('drop', { dataTransfer });

            cy.get('[data-testid="buns"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-bun"]').first().find('.constructor-element__text').should('have.text', `${el.text()} (верх)`);
                cy.get('[data-testid="target-bun"]').last().find('.constructor-element__text').should('have.text', `${el.text()} (низ)`);
            });

            cy.get('[data-testid="buns"]').find('[data-testid="ingredient"]').last().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-bun"]').last().trigger('drop', { dataTransfer });

            cy.get('[data-testid="buns"]').find('[data-testid="ingredient"]').last().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-bun"]').first().find('.constructor-element__text').should('have.text', `${el.text()} (верх)`);
                cy.get('[data-testid="target-bun"]').last().find('.constructor-element__text').should('have.text', `${el.text()} (низ)`);
            });
        });
    });

    it('should drag filling and drop to target', function() {
        cy.wait('@ingredients').then(() => {
            const dataTransfer = new DataTransfer();
        
            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });
        });
    });

    it('should drag filling and drop to target even if same filling already exist to target', function() {
        cy.wait('@ingredients').then(() => {
            const dataTransfer = new DataTransfer();

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });
        
            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
                cy.get('[data-testid="target-filling"]').last().find('.constructor-element__text').should('have.text', el.text());
            });
        });
    });

    it('should drag filling and drop to target between existed two fillings', function() {
        cy.wait('@ingredients').then(() => {
            const dataTransfer = new DataTransfer();

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });
        
            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
                cy.get('[data-testid="target-filling"]').last().find('.constructor-element__text').should('have.text', el.text());
            });
        
            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').eq(1).trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').last().trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').eq(1).find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').eq(1).find('.constructor-element__text').should('have.text', el.text());
            });
        });
    });

    it('should add topping before all existing', function() {
        cy.wait('@ingredients').then(() => {
            const dataTransfer = new DataTransfer();

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });
        
            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
                cy.get('[data-testid="target-filling"]').last().find('.constructor-element__text').should('have.text', el.text());
            });
        
            cy.get('[data-testid="toppings"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').first().trigger('drop', { dataTransfer });

            cy.get('[data-testid="toppings"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });
        });
    });

    it('should exchange first target filling with last one', function() {
        cy.wait('@ingredients').then(() => {
            const dataTransfer = new DataTransfer();

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });
        
            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
                cy.get('[data-testid="target-filling"]').last().find('.constructor-element__text').should('have.text', el.text());
            });
        
            cy.get('[data-testid="toppings"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').first().trigger('drop', { dataTransfer });

            cy.get('[data-testid="toppings"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });
            
            let fillingNames = [];

            cy.get('[data-testid="target-filling"] .constructor-element__text').each(el => fillingNames.push(el.text())).then(
                () => {
                    cy.get('[data-testid="target-filling"]').first().trigger('dragstart', { dataTransfer });
                    cy.get('[data-testid="target-filling"]').last().trigger('drop', { dataTransfer });
                    cy.get('[data-testid="target-filling"]').last().trigger('dragstart', { dataTransfer });
                    cy.get('[data-testid="target-filling"]').first().trigger('drop', { dataTransfer });
                    cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', fillingNames[fillingNames.length - 1]);
                    cy.get('[data-testid="target-filling"]').last().find('.constructor-element__text').should('have.text', fillingNames[0]);
                }
            );
        });
    });

    it('should remove first filling', function() {
        cy.wait('@ingredients').then(() => {
            const dataTransfer = new DataTransfer();

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });
        
            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
                cy.get('[data-testid="target-filling"]').last().find('.constructor-element__text').should('have.text', el.text());
            });
        
            cy.get('[data-testid="toppings"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').first().trigger('drop', { dataTransfer });

            cy.get('[data-testid="toppings"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });

            cy.get('[data-testid="target-filling"]').first().then(
                el => {
                    const uuid = el.attr('data-uuid');
                    cy.get('[data-testid="target-filling"]:first .constructor-element__action').click();
                    cy.get('[data-testid="target-filling"]').filter((i, e) => e.getAttribute('data-uuid') === uuid).should('have.length', 0);
                }
            )
        });
    });

    it('should create order', function() {
        cy.wait('@ingredients').then(() => {
            const dataTransfer = new DataTransfer();

            cy.get('[data-testid="buns"]').find('[data-testid="ingredient"]').last().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-bun"]').last().trigger('drop', { dataTransfer });

            cy.get('[data-testid="buns"]').find('[data-testid="ingredient"]').last().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-bun"]').first().find('.constructor-element__text').should('have.text', `${el.text()} (верх)`);
                cy.get('[data-testid="target-bun"]').last().find('.constructor-element__text').should('have.text', `${el.text()} (низ)`);
            });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').trigger('drop', { dataTransfer });

            cy.get('[data-testid="sauces"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });

            cy.get('[data-testid="toppings"]').find('[data-testid="ingredient"]').first().trigger('dragstart', { dataTransfer });
            cy.get('[data-testid="target-filling"]').first().trigger('drop', { dataTransfer });

            cy.get('[data-testid="toppings"]').find('[data-testid="ingredient"]').first().find('[data-testid="ingredient-name"]').then(el => {
                cy.get('[data-testid="target-filling"]').first().find('.constructor-element__text').should('have.text', el.text());
            });

            cy.get('button').contains('Оформить заказ').click();
            cy.contains('Вход');

            const email = 'ioaksenenko@gmail.com';
            const password = 'R4rnec#2486';
            cy.get('input[name="email"]').type(email);
            cy.get('input[name="password"]').type(`${password}{enter}`);
            cy.wait('@login').then(() => {
                cy.intercept('GET', '/api/auth/user', { fixture: 'user-success.json' }).as('user-success');
                cy.get('[data-testid="nav-link"]').contains('Аксененко Иван');
                cy.contains('Соберите бургер');
                cy.get('button').contains('Оформить заказ').click();
                cy.wait('@order').then(() => {
                    cy.contains('Ваш заказ начали готовить');
                    cy.get('[data-testid="close-modal"]').click();
                    cy.contains('Ваш заказ начали готовить').should('not.exist');
                    cy.contains('Перетащите сюда ингредиенты');
                });
            });
        });
    });
});