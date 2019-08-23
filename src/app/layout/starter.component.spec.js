"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var starter_component_1 = require("./starter.component");
var starter_header_component_1 = require("./starter-header/starter-header.component");
var starter_left_side_component_1 = require("./starter-left-side/starter-left-side.component");
var starter_content_component_1 = require("./starter-content/starter-content.component");
var starter_footer_component_1 = require("./starter-footer/starter-footer.component");
var starter_control_sidebar_component_1 = require("./starter-control-sidebar/starter-control-sidebar.component");
describe('StarterComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule
            ],
            declarations: [
                starter_component_1.StarterComponent,
                starter_header_component_1.StarterHeaderComponent,
                starter_left_side_component_1.StarterLeftSideComponent,
                starter_content_component_1.StarterContentComponent,
                starter_footer_component_1.StarterFooterComponent,
                starter_control_sidebar_component_1.StarterControlSidebarComponent
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(starter_component_1.StarterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
    it('should render title in a h1 tag', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(starter_component_1.StarterComponent);
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Page Header');
    }));
});
//# sourceMappingURL=starter.component.spec.js.map