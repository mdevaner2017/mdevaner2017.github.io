import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  @Input("text") text: boolean = true;
  @Input("back") back: boolean = false;
  @Input("title") title: any;
  @Input("index") index: any;
  @Input("hasToggle") hasToggle: boolean = true;
  @Input("components") components: any[] = [];
  @Input('variables') variables: any;
  @Input('operator') operator: any = {
    reference: '',
    value: ''
  };
  private pressedAlt: boolean = false;

  isHidden: boolean = true;

  @Output("remove") remove = new EventEmitter();
  @Output("change") change = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeVariable() {
    this.operator.reference = this.operator.currentVariable.name;
    this.operator.operators = [];

    this.setStorage();
  }

  addOperator(type: string, value: string = "") {
    this.operator.operators.push({
      index: this.operator.operators.length,
      type: type,
      value: value,
    });
    this.changeValue();

    this.focusOperator(this.operator.operators.length - 1);
  }

  focusOperator(indexOp: any) {
    setTimeout(() => {
      let operatorElement = document.getElementById(`operator-op-${this.index}-${indexOp}`);

      if (operatorElement) {
        operatorElement.focus();
      }
    }, 200);
  }

  clearOperator(index: any) {
    this.operator.operators.splice(index, 1);
    this.changeValue();
  }

  clearValue(operator: any) {
    operator.value = "";
    this.setStorage();
  }

  changeValue() {
    this.operator.value = "";
    this.operator.operators.forEach((op: any) => {
      this.operator.value += `${op.value} `;
    });
    this.setStorage();
  }

  changeInputValue(operator: any) {
    switch (this.operator.currentVariable.type) {
      case "INTEGER":
        if (!/^[0-9]+$/.test(operator.value)) {
          operator.value = operator.value.substring(0, operator.value.length - 1);
        }
        break;
      case "DOUBLE":
        if (!/^[+-]?\d+((\.|\,)\d+)?$/.test(operator.value)) {
          let lastCharacter = operator.value.substring(operator.value.length - 1, operator.value.length);

          if (lastCharacter != "." && lastCharacter != ",") {
            operator.value = operator.value.substring(0, operator.value.length - 1);
          }
        }
        break;
      default:
        break;
    }

    this.changeValue();
  }

  getVariables() {
    if (this.operator.currentVariable.type == "DOUBLE") {
      return this.variables.filter((v: any) => v.value.type == 'DOUBLE' || v.value.type == 'INTEGER');
    } else {
      return this.variables.filter((v: any) => v.value.type == this.operator.currentVariable.type);
    }
  }

  toggleHidden() {
    this.isHidden = !this.isHidden;

    if (!this.isHidden) {
      setTimeout(() => {
        document.getElementById("operator-cod-" + this.index)?.focus();
      }, 200);
    } else {
      setTimeout(() => {
        document.getElementById("select-var-" + this.index)?.focus();
      }, 200);
    }

  }

  removeOperator() {
    this.remove.emit(this.index);
  }

  focusElement(id: string) {
    setTimeout(() => {
      let operatorElement = document.getElementById(id);

      if (operatorElement) {
        operatorElement.focus();
      }
    }, 200);
  }

  setStorage() {
    this.change.emit();
  }

  compareFn(var1: any, var2: any) {
    return var1 && var2 ? var1.name === var2.name : var1 === var2;
  }
}
