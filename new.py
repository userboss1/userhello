#CHECK SMALLLEST AMONG THREE integer

d1=int(input("enter 1st Number:"))
d2=int(input("enter 2nd Number:"))
d3=int(input("enter 3rd Number:"))
if d1<d2 and d1<d3:
      print(f"{d1} is smallerr")
elif d2<d3:
    print(f"{d2} is smaller")

else:
    print(f"{d3} is smaller")    

#CHECK ARITHMETIC OPERATION
num1 =int(input("enter a Number:"))
num2 =int(input("enter 2nd Number:"))
add=num1+num2
sub=num1-num2
mul=num1*num2
div=num1/num2
print(add)
print(sub)
print(mul)
print(div)

#Multiplication Table
def mult(a):
    for i in range(1,11):
        print(f"{i}x{a}={i*a}")
new=int(input("enter a Number:"))
mult(new)

#check vowels
def count(word):
    vowels="aeiouAEIOU"
    count1=0
    for char in word:
        if char in vowels:
            count1 +=1
    return count1
newq=input("enter a word")
print("number of vowels",count(newq))
#check largest among two integer
n1=int(input("enter a number"))
n2=int(input("enter 2nd number"))
if n1>n2:
    print(f"{n1} is greater")
else:
    print(f"{n2}is greateer")


