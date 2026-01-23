while True:
    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))

    operation = input("Enter operation (+, -, *, /): ")
    if operation == '+':
            print(f"The result is: {a + b}")
    elif operation == '-':
            print(f"The result is: {a - b}")
    elif operation == '*':
            print(f"The result is: {a * b}") 
    elif operation == '/':
            if b != 0:
                print(f"The result is: {a / b}")
            else:
                print("Error: Division by zero")
    else:
            print("Error: Invalid operation") 
    cont = input("Do you want to perform another operation? (yes/no): ")
    if cont.lower() != 'yes':
            break
    else:
            continue
        