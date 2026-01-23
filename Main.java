public class Main {
    public static void main(String[] args) {
       java.util.Scanner sc = new java.util.Scanner(System.in);
         System.out.println("Welcome to the Calculator!");
         System.out.print("Enter first number: ");
         double num1 = sc.nextDouble();
         System.out.print("Enter second number: ");
         double num2 = sc.nextDouble();
         System.out.print("Enter an operator (+, -, *, /): ");
         char operator = sc.next().charAt(0);
         double result;
         switch (operator) {
             case '+':
                 result = num1 + num2;
                 break;
             case '-':
                 result = num1 - num2;
                 break;
             case '*':
                 result = num1 * num2;
                 break;
             case '/':
                 if (num2 != 0) {
                     result = num1 / num2;
                 } else {
                     System.out.println("Error: Division by zero");;
                     sc.close();
                     return; 
    }
                    break;
                default:
                    System.out.println("Error: Invalid operator");
                    sc.close();
                    return; 
            }
            System.out.println("Result: " + result);
            sc.close();
        } }
