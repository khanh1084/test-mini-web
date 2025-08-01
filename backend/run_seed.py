#!/usr/bin/env python3
import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.seed_data import seed_data

if __name__ == "__main__":
    seed_data() 